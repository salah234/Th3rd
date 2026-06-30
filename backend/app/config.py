"""Application configuration.

Loaded from environment / `.env` via pydantic-settings. TH-5 expands this into the
full secret schema; TH-1 keeps only what the skeleton needs to boot.
"""

from __future__ import annotations

from pathlib import Path

from pydantic_settings import (
    BaseSettings,
    PydanticBaseSettingsSource,
    SettingsConfigDict,
)

# Absolute path to backend/.env (this file lives at backend/app/config.py), so the
# env file loads no matter which directory the process is started from.
ENV_FILE = Path(__file__).resolve().parent.parent / ".env"


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=ENV_FILE,
        env_file_encoding="utf-8",
        extra="ignore",
    )

    @classmethod
    def settings_customise_sources(
        cls,
        settings_cls: type[BaseSettings],
        init_settings: PydanticBaseSettingsSource,
        env_settings: PydanticBaseSettingsSource,
        dotenv_settings: PydanticBaseSettingsSource,
        file_secret_settings: PydanticBaseSettingsSource,
    ) -> tuple[PydanticBaseSettingsSource, ...]:
        # Prefer this project's `.env` over ambient OS env vars so unrelated globals
        # (e.g. a bare SUPABASE_URL exported in ~/.zshrc for another project) can't
        # shadow our config. Constructor args still win; OS env is the fallback.
        return (init_settings, dotenv_settings, env_settings, file_secret_settings)

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
