from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    openai_api_key: str
    usda_api_key: str = "DEMO_KEY"
    supabase_url: str
    supabase_secret_key: str
    supabase_publishable_key: str = ""  # frontend only (Phase 3)

    class Config:
        env_file = ".env"


settings = Settings()
