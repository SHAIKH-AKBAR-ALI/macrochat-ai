from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    openai_api_key: str
    usda_api_key: str = "DEMO_KEY"
    supabase_url: str
    supabase_secret_key: str
    supabase_publishable_key: str = ""  # frontend only (Phase 3)
    gemini_api_key: str = ""  # guest-mode LLM; falls back to OpenAI if unset
    groq_api_key: str = ""  # guest-mode fallback between Gemini and OpenAI

    class Config:
        env_file = ".env"
        extra = "ignore"  # unrelated keys in .env must not crash startup


settings = Settings()
