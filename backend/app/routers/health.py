"""Health check endpoint. Expanded with dependency probes in TH-20 / TH-81."""

from __future__ import annotations

from fastapi import APIRouter

from app import __version__

router = APIRouter(tags=["health"])


@router.get("/api/health")
async def health() -> dict[str, str]:
    return {"status": "ok", "service": "th3rd-backend", "version": __version__}
