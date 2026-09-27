# SIH26108 - BIS Recommendation Engine

## Stack
- FastAPI + SQLModel
- PostgreSQL + pgvector
- Redis
- BGE-M3 (via Text Embeddings Inference server) 
- Gemini 2.0 Flash (via LiteLLM)

## Local Dev Setup

1. Start databases and embedding server:
```bash
docker-compose up db redis tei -d
```

2. Run backend locally:
```bash
cd backend
python -m venv .venv
source .venv/bin/activate  # or .\.venv\Scripts\Activate.ps1 on Windows
pip install -r requirements.txt
alembic upgrade head
uvicorn app.main:app --reload
```

## Testing
```bash
cd backend
pytest
```
