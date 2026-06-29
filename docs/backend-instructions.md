# Th3rd Backend — Run Instructions

  Run it with:
  cd backend && python -m venv .venv && source .venv/bin/activate
  pip install -e ".[dev]" && cp .env.example .env
  uvicorn app.main:app --reload --port 8000