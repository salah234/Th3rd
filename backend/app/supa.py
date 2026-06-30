"""Supabase client.

A single, lazily-created Supabase client shared across the app. Backend code runs
trusted server-side, so it uses the **service-role** key (bypasses Row-Level Security).
Never expose this client or its key to the browser — the frontend uses the publishable
(anon) key directly instead.

Usage:
    from app.supa import get_client

    rows = get_client().table("products").select("*").execute().data
"""

from __future__ import annotations

from functools import lru_cache

from supabase import Client, create_client

from app.config import settings


@lru_cache(maxsize=1)
def get_client() -> Client:
    """Return the process-wide Supabase client, creating it on first use."""
    if not settings.supabase_url:
        raise RuntimeError("SUPABASE_URL is not set — check backend/.env")

    key = settings.supabase_service_role_key or settings.supabase_anon_key
    if not key:
        raise RuntimeError(
            "No Supabase key set — set SUPABASE_SERVICE_ROLE_KEY (preferred for the "
            "backend) or SUPABASE_ANON_KEY in backend/.env"
        )

    return create_client(settings.supabase_url, key)
