# Th3rd

Editorial hijab storefront. A monorepo with a Next.js storefront and a Python
(FastAPI) backend, backed by **Supabase** and **Stripe**.

## Architecture

The browser talks **only** to the FastAPI backend over REST/JSON. The backend owns
commerce and customer logic directly on Supabase (Postgres / Auth / Storage) and
Stripe for payments.

```
          ┌───────────┐   REST/JSON   ┌────────────┐   ┌──────────────────────────┐
  Browser │  Next.js  │  ───────────▶ │  FastAPI   │──▶│        Supabase          │
  ───────▶│ storefront│               │  backend   │   │ Postgres · Auth · Storage │
          └───────────┘               │  (Python)  │   └──────────────────────────┘
                                       │            │   ┌────────────┐
                                       │            │──▶│   Stripe   │  (payments)
                                       └────────────┘   └─────┬──────┘
                                             ▲                 │ webhook
                                             └─────────────────┘
```

### Why this shape

- **REST/JSON everywhere.** The storefront is browser-facing and there is a single
  Python service — no gRPC.
- **Async I/O.** Use async DB / HTTP clients (e.g. `httpx`, async Postgres driver),
  never blocking calls, so FastAPI's event loop stays free.
- **Supabase as the platform.** Postgres for data, Auth for customers (JWT), Storage
  for product images — one managed backend instead of self-hosted infra.
- **Ownership.** FastAPI owns catalog, cart, checkout, orders, auth, profiles,
  waitlist, newsletter, notifications, and the Stripe integration.

## Layout

```
Th3rd/
  frontend/   # Next.js 16 storefront (App Router, Tailwind v4, Framer Motion)
  backend/    # FastAPI backend — the only API the browser talks to
  docs/       # architecture notes + the ticket backlog
```

Each service has its own `README.md` and `.env.example`:

- [`frontend/README.md`](frontend/README.md)
- [`backend/README.md`](backend/README.md) · [`backend/.env.example`](backend/.env.example)

## Frontend contract

The backend must satisfy the types in
[`frontend/lib/types.ts`](frontend/lib/types.ts): `Item`, `Collection`, `Cart`,
`CartItem`, `Client` (`stripeCustomerId`), `Subscriber`.

### FastAPI public REST surface (storefront-facing)

```
GET    /api/products                       GET    /api/collections
GET    /api/products/{id}                  GET    /api/collections/{handle}
POST   /api/cart                           POST   /api/cart/{id}/checkout
GET    /api/cart/{id}                      POST   /api/orders
POST   /api/cart/{id}/items                GET    /api/orders/{id}
PATCH  /api/cart/{id}/items/{lineId}       POST   /api/webhooks/stripe
DELETE /api/cart/{id}/items/{lineId}       POST   /api/auth/*
POST   /api/subscribers                    GET    /api/customers/me
POST   /api/waitlist                       PATCH  /api/customers/me
GET    /api/health
```

## Getting started

Postgres / Auth / Storage are hosted on Supabase, so there is nothing to run
locally besides the two services. Run each from its own directory.

Backend (http://localhost:8000 · docs at `/docs`):

```bash
cd backend
python -m venv .venv && source .venv/bin/activate
pip install -e ".[dev]"
cp .env.example .env        # add Supabase + Stripe creds
uvicorn app.main:app --reload --port 8000
```

Storefront (http://localhost:3000):

```bash
cd frontend && npm install && npm run dev
```

## Roadmap

The backend backlog lives in [`docs/backend-tickets.md`](docs/backend-tickets.md).

> ⚠️ The backlog was written for an earlier **Medusa-based** architecture. Medusa
> has been dropped in favour of FastAPI-direct-on-Supabase; the Medusa epics
> (catalog/cart/checkout engine, regions, price lists) need rewriting as FastAPI +
> Supabase work. See the note at the top of that file.
