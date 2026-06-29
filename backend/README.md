# Th3rd Backend — FastAPI

Python backend for the Th3rd storefront. The browser talks **only** to this service
over REST/JSON. It owns commerce and customer logic directly on **Supabase**
(Postgres / Auth / Storage) and **Stripe** for payments.

See the [root README](../README.md) for the full topology.

## Responsibilities

- Public REST surface for the storefront (catalog, cart, checkout, orders, auth,
  subscribers, waitlist) — see the contract in the root README.
- Catalog / cart / order data in Supabase Postgres.
- Auth via Supabase (JWT verification); customer profiles.
- Payments via Stripe; subscribers + waitlist (Python-owned).

DTOs map to the frontend types in `frontend/lib/types.ts` (`Item`, `Collection`,
`Cart`, `CartItem`, `Client`, `Subscriber`).

## Stack

- **FastAPI** + **uvicorn** (ASGI)
- **Supabase** — Postgres, Auth (JWT), Storage
- **Redis** — caching / rate limiting
- **Stripe** — payments
- **pydantic** / **pydantic-settings** (DTOs + config)
- **pytest** · **ruff** · **mypy** (dev)

## Layout

```
backend/
  app/
    main.py          # app factory (create_app), CORS, router wiring
    config.py        # pydantic-settings env schema
    routers/
      health.py      # GET /api/health
  tests/
    test_health.py
  pyproject.toml
  .env.example
```

## Getting started

```bash
cd backend
python -m venv .venv && source .venv/bin/activate
pip install -e ".[dev]"

cp .env.example .env        # fill in Supabase + Stripe values

uvicorn app.main:app --reload --port 8000
```

- Health: http://localhost:8000/api/health
- OpenAPI docs: http://localhost:8000/docs

## Checks

```bash
pytest          # tests
ruff check .    # lint
mypy app        # type-check
```
