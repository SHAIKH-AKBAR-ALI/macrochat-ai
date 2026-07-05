"""LangGraph pipeline: identify -> lookup -> aggregate -> respond.

LLM identifies foods and reasons about portions. Macro numbers and totals
come from nutrition.py + plain Python — never from the LLM.
"""
import re
from typing import Literal, TypedDict

from langchain_core.messages import HumanMessage, SystemMessage
from langchain_openai import ChatOpenAI
from langgraph.graph import END, START, StateGraph
from pydantic import BaseModel, Field

from app import nutrition
from app.config import settings

llm_mini = ChatOpenAI(model="gpt-4o-mini", api_key=settings.openai_api_key, temperature=0)
llm_full = ChatOpenAI(model="gpt-4o", api_key=settings.openai_api_key, temperature=0.4)

# Guest (not logged in) traffic runs on Gemini via its OpenAI-compatible endpoint —
# keeps OpenAI spend for signed-in users. Falls back to OpenAI if no Gemini key.
if settings.gemini_api_key:
    _GEMINI_BASE = "https://generativelanguage.googleapis.com/v1beta/openai/"
    llm_guest_mini = ChatOpenAI(model="gemini-2.5-flash", api_key=settings.gemini_api_key,
                                base_url=_GEMINI_BASE, temperature=0)
    llm_guest_full = ChatOpenAI(model="gemini-2.5-flash", api_key=settings.gemini_api_key,
                                base_url=_GEMINI_BASE, temperature=0.4)
else:
    llm_guest_mini, llm_guest_full = llm_mini, llm_full


class FoodItem(BaseModel):
    name: str = Field(description="Food name, e.g. 'chicken breast', 'roti'")
    prep_style: str | None = Field(None, description="Visible/stated prep: grilled, fried, curry...")
    sauces_oil: str | None = Field(None, description="Visible sauces or oil, if apparent")
    portion_grams: float = Field(description="Portion in grams. Use user-stated amount if given, else estimate from photo.")
    portion_confidence: Literal["high", "low"] = Field(
        description="'high' ONLY if the user explicitly stated the amount in text; 'low' if estimated from photo"
    )


class IdentifiedMeal(BaseModel):
    is_food_log: bool = Field(
        description="True ONLY if the user is reporting food they ate (photo or text). "
                    "False for questions ('what did I eat today?'), greetings, or anything else."
    )
    items: list[FoodItem]


class State(TypedDict, total=False):
    image_b64: str | None
    text: str | None
    guest: bool  # not logged in -> Gemini models
    today: dict | None  # backend-computed daily totals; LLM narrates, never computes
    is_food_log: bool
    items: list[dict]
    totals: dict
    overall_confidence: str
    needs_confirmation: bool
    reply: str


IDENTIFY_SYSTEM = (
    "You identify foods in a meal from a photo and/or text description. "
    "First decide: is the user actually logging food? Questions, greetings or chit-chat are NOT a food log. "
    "Only list foods clearly visible in the photo or stated in text — never invent items. "
    "If no food is present, return is_food_log=false and an empty list. "
    "Name the SIMPLEST, most literal food you can see: a plain red apple is 'apple', not a pastry, "
    "dish, or packaged product containing apple. Only name a specific preparation or processed product "
    "when there is clear visual evidence — browning/char, frying, slicing, packaging, sauce, dehydrated texture. "
    "Never pick a more specific or 'interesting' name than the image supports. "
    "If the user's text names a food, that IS the food — use the user's wording as the item name; "
    "the photo then only informs portion size and prep style. "
    "For each food: name it, note preparation style (grilled/fried/curry/etc.) and visible sauces/oil. "
    "Portions: if the user's text states an amount (e.g. '200g chicken', '2 rotis'), convert to grams and mark confidence 'high'. "
    "Otherwise estimate grams from the photo and mark confidence 'low'. "
    "Do NOT provide any calorie or macro numbers."
)

# Quantity/filler words that never name a food — ignored when comparing the user's
# text against the vision model's identification.
_NONFOOD_WORDS = frozenset(
    "a an the and or with of in on my me i we you it ate had eat eating having for some this that "
    "one two three four five six seven eight nine ten dozen half quarter few couple "
    "g gm gram grams kg kilo ml l litre liter cup cups tbsp tsp spoon piece pieces pc pcs "
    "plate plates bowl bowls glass glasses slice slices serving servings portion portions "
    "small medium large big little tiny huge approx about around roughly maybe "
    "breakfast lunch dinner snack meal today yesterday morning afternoon evening night just".split()
)


def _sing(w: str) -> str:
    # ponytail: crude singularizer, consistent on both sides so mangling cancels out
    return w[:-2] if w.endswith("es") else (w[:-1] if w.endswith("s") else w)


def _food_words(text: str) -> list[str]:
    return [w for w in re.findall(r"[a-z]+", text.lower()) if w not in _NONFOOD_WORDS]


def reconcile_identity(items: list[dict], text: str | None) -> list[dict]:
    """User text is ground truth for WHAT the food is — the user can see the real
    object; vision only guesses from pixels. Two rules, applied in place:
    - vision name = user's food words + extra qualifiers ("banana" -> "dehydrated
      banana meal") -> strip back to the user's plainer name
    - vision name shares no food word with the user's text -> identity conflict:
      force the confirm step, never auto-save
    """
    user_words = _food_words(text or "")
    user_set = {_sing(w) for w in user_words}
    if not user_set:
        return items
    for item in items:
        item_set = {_sing(w) for w in re.findall(r"[a-z]+", item["name"].lower())}
        common = item_set & user_set
        if not common:
            # stated food and identified food disagree — route to confirm.
            # ponytail: reuse portion_confidence so existing confirm plumbing applies
            item["portion_confidence"] = "low"
        elif user_set <= item_set and item_set - user_set:
            item["name"] = " ".join(dict.fromkeys(user_words))
    return items


def identify(state: State) -> State:
    content: list = []
    if state.get("text"):
        content.append({"type": "text", "text": state["text"]})
    if state.get("image_b64"):
        content.append({
            "type": "image_url",
            "image_url": {"url": f"data:image/jpeg;base64,{state['image_b64']}"},
        })
    llm = llm_guest_mini if state.get("guest") else llm_mini
    result = llm.with_structured_output(IdentifiedMeal).invoke(
        [SystemMessage(IDENTIFY_SYSTEM), HumanMessage(content=content)]
    )
    items = reconcile_identity([i.model_dump() for i in result.items], state.get("text"))
    return {
        "is_food_log": result.is_food_log and bool(items),
        "items": items,
    }


def lookup(state: State) -> State:
    items = []
    for item in state["items"]:
        hit = nutrition.lookup(item["name"], item.get("prep_style"))
        if hit:
            g = item["portion_grams"]
            item |= {
                "matched_db_name": hit["matched_name"],
                "source": hit["source"],
                "kcal": round(hit["kcal_100g"] * g / 100, 1),
                "protein": round(hit["protein_100g"] * g / 100, 1),
                "carbs": round(hit["carb_100g"] * g / 100, 1),
                "fat": round(hit["fat_100g"] * g / 100, 1),
            }
        else:
            # never invent numbers for unmatched foods
            item |= {"matched_db_name": None, "source": None,
                     "kcal": None, "protein": None, "carbs": None, "fat": None}
        items.append(item)
    return {"items": items}


def aggregate(state: State) -> State:
    matched = [i for i in state["items"] if i["kcal"] is not None]
    totals = {
        "kcal": round(sum(i["kcal"] for i in matched), 1),
        "protein": round(sum(i["protein"] for i in matched), 1),
        "carbs": round(sum(i["carbs"] for i in matched), 1),
        "fat": round(sum(i["fat"] for i in matched), 1),
    }
    # empty items (non-food input) must never auto-save as a "high confidence" 0-kcal meal
    all_high = bool(state["items"]) and all(
        i["portion_confidence"] == "high" for i in state["items"]
    )
    return {
        "totals": totals,
        "overall_confidence": "high" if all_high else "low",
        "needs_confirmation": not all_high,
    }


RESPOND_SYSTEM = (
    "You are MacroChat, an upbeat nutrition coach. Keep every reply SHORT — 2 to 4 sentences, no lists. "
    "Use ONLY the numbers provided — never recompute, adjust, or invent any value. "
    "For a meal: one-sentence summary (total kcal + protein), then if 'today' data is given, "
    "say what's remaining for the day. If confidence is low, ask the user to confirm portions. "
    "If an item is unmatched (null macros), say briefly you couldn't find it in the database. "
    "End with ONE short, specific encouragement or practical health tip tied to this meal. "
    "Never claim exact accuracy for estimated portions."
)

CHAT_SYSTEM = (
    "You are MacroChat, an upbeat nutrition coach. The user asked a question instead of logging food. "
    "Keep it SHORT — 2 to 4 sentences. If 'today' data is provided, answer using ONLY those numbers "
    "(meals logged, eaten vs goals, remaining) — never compute or invent values. "
    "If no 'today' data, say they need to log in and log meals to track their day. "
    "Close with a brief motivational or healthy-habit tip. To log food they just type the meal or send a photo."
)


def respond(state: State) -> State:
    llm = llm_guest_full if state.get("guest") else llm_full
    if not state.get("is_food_log", True):
        reply = llm.invoke([
            SystemMessage(CHAT_SYSTEM),
            HumanMessage(content=str({"user_message": state.get("text"), "today": state.get("today")})),
        ])
        # chat turn: nothing to look up, save, or confirm
        return {
            "reply": reply.content, "items": [],
            "totals": {"kcal": 0, "protein": 0, "carbs": 0, "fat": 0},
            "overall_confidence": "high", "needs_confirmation": False,
        }
    summary = {
        "items": state["items"],
        "totals": state["totals"],
        "overall_confidence": state["overall_confidence"],
        "today": state.get("today"),
    }
    reply = llm.invoke(
        [SystemMessage(RESPOND_SYSTEM), HumanMessage(content=str(summary))]
    )
    return {"reply": reply.content}


def build_graph():
    g = StateGraph(State)
    g.add_node("identify", identify)
    g.add_node("lookup", lookup)
    g.add_node("aggregate", aggregate)
    g.add_node("respond", respond)
    g.add_edge(START, "identify")
    g.add_conditional_edges(
        "identify",
        lambda s: "lookup" if s.get("is_food_log") else "respond",
        ["lookup", "respond"],
    )
    g.add_edge("lookup", "aggregate")
    g.add_edge("aggregate", "respond")
    g.add_edge("respond", END)
    return g.compile()


pipeline = build_graph()
