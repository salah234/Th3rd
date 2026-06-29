"""FastAPI app factory.

TH-1 scaffolding: a buildable, runnable skeleton with health + CORS + OpenAPI.
The real routers (catalog, cart, checkout, auth, subscribers) land in later tickets.
"""

from __future__ import annotations

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app import __version__
from app.config import settings
from app.routers import health
from app.routers import product


def create_app() -> FastAPI:
    app = FastAPI(
        title="Th3rd Backend",
        version=__version__,
        description="FastAPI backend over Supabase + Stripe for the Th3rd storefront.",
    )

    app.add_middleware(
        CORSMiddleware,
        allow_origins=[settings.frontend_origin],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    app.include_router(health.router)
    app.include_router(product.router)

    return app


app = create_app()
