import httpx
from app.config import settings
import logging

logger = logging.getLogger(__name__)

async def embed(text: str) -> list[float]:
    # TEI expects POST /embed with {"inputs": text}
    # Adjust payload based on exact TEI version/params
    async with httpx.AsyncClient() as client:
        try:
            response = await client.post(
                settings.BGE_INFERENCE_URL,
                json={"inputs": text},
                timeout=10.0
            )
            response.raise_for_status()
            data = response.json()
            return data[0] if isinstance(data, list) else data
        except Exception as e:
            logger.error(f"Embedding generation failed: {e}")
            # Fallback returning zero vector (or raise error based on preference)
            return [0.0] * settings.EMBEDDING_DIM

async def embed_batch(texts: list[str]) -> list[list[float]]:
    async with httpx.AsyncClient() as client:
        try:
            response = await client.post(
                settings.BGE_INFERENCE_URL,
                json={"inputs": texts},
                timeout=30.0
            )
            response.raise_for_status()
            return response.json()
        except Exception as e:
            logger.error(f"Batch embedding generation failed: {e}")
            return [[0.0] * settings.EMBEDDING_DIM for _ in texts]
