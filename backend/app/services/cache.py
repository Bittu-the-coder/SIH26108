import json
from typing import Optional, Any
import redis.asyncio as redis
from app.config import settings
import hashlib

# Global redis client
redis_client: Optional[redis.Redis] = None

async def init_redis():
    global redis_client
    redis_client = redis.from_url(settings.REDIS_URL, decode_responses=True)

async def close_redis():
    global redis_client
    if redis_client:
        await redis_client.aclose()

def generate_key(prefix: str, *args) -> str:
    key_str = "_".join(str(a) for a in args if a is not None)
    hash_obj = hashlib.sha256(key_str.encode('utf-8')).hexdigest()
    return f"{prefix}:{hash_obj}"

async def get_cached(key: str) -> Optional[Any]:
    if not redis_client:
        return None
    data = await redis_client.get(key)
    if data:
        return json.loads(data)
    return None

async def set_cached(key: str, value: Any, ttl_seconds: int) -> None:
    if not redis_client:
        return
    await redis_client.setex(key, ttl_seconds, json.dumps(value))
