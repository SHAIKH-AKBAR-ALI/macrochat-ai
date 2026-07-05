"""LangGraph pipeline: identify -> lookup -> aggregate -> respond.

LLM identifies foods and reasons about portions. Macro numbers and totals
come from nutrition.py + plain Python — never from the LLM.
"""
from typing import Literal, TypedDict

from langchain_core.messages import HumanMessage, SystemMessage
from langchain_openai import ChatOpenAI
from langgraph.graph import END, START, StateGraph
from pydantic import BaseModel, Field

from app import nutrition
from app.config import settings

llm_mini = ChatOpenAI(model="gpt-4o-mini", api_key=settings.openai_api_key, temperature=0)
llm_full = ChatOpenAI(model="gpt-4o", api_key=settings.openai_api_key, temperature=0.4)


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
    "For each food: name it, note preparation style (grilled/fried/curry/etc.) and visible sauces/oil. "
    "Portions: if the user's text states an amount (e.g. '200g chicken', '2 rotis'), convert to grams and mark confidence 'high'. "
    "Otherwise estimate grams from the photo and mark confidence 'low'. "
    "Do NOT provide any calorie or macro numbers."
)


def identify(state: State) -> State:
    content: list = []
    if state.get("text"):
        content.append({"type": "text", "text": state["text"]})
    if state.get("image_b64"):
        content.append({
            "type": "image_url",
            "image_url": {"url": f"data:image/jpeg;base64,{state['image_b64']}"},
        })
    result = llm_mini.with_structured_output(IdentifiedMeal).invoke(
        [SystemMessage(IDENTIFY_SYSTEM), HumanMessage(content=content)]
    )
    return {
        "is_food_log": result.is_food_log and bool(result.items),
        "items": [i.model_dump() for i in result.items],
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
    if not state.get("is_food_log", True):
        reply = llm_full.invoke([
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
    reply = llm_full.invoke(
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
