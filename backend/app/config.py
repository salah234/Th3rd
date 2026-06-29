"""Application configuration.

Loaded from environment / `.env` via pydantic-settings. TH-5 expands this into the
full secret schema; TH-1 keeps only what the skeleton needs to boot.
"""

from __future__ import annotations

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",
    )

    # --- App ---
    app_name: str = "th3rd-backend"
    environment: str = "development"
    log_level: str = "INFO"

    # --- CORS (Next.js storefront origin) ---
    frontend_origin: str = "http://localhost:3000"

    # --- Supabase (Postgres / Auth / Storage) ---
    supabase_url: str = ""
    supabase_anon_key: str = ""
    supabase_service_role_key: str = ""
    supabase_jwt_secret: str = ""
    database_url: str = ""

    # --- Redis (caching) ---
    redis_url: str = "redis://localhost:6379"

    # --- Stripe ---
    stripe_secret_key: str = ""
    stripe_webhook_secret: str = ""


settings = Settings()
