from pydantic_settings import BaseSettings, SettingsConfigDict
from typing import Optional

class Settings(BaseSettings):
    DATABASE_URL: str = "postgresql+asyncpg://sih:sih_password@localhost:5432/sih26108"
    REDIS_URL: str = "redis://localhost:6379"
    GEMINI_API_KEY: str = ""
    GROQ_API_KEY: str = ""
    GROQ_MODEL: Optional[str] = None
    BGE_INFERENCE_URL: str = "http://localhost:8080/embed"
    BGE_RERANKER_URL: str = "http://localhost:8081/rerank"
    RERANKER_ENABLED: bool = False
    JWT_SECRET: str = "supersecretkey_please_change_in_production"
    JWT_ALGORITHM: str = "HS256"
    JWT_EXPIRE_MINUTES: int = 60
    EMBEDDING_DIM: int = 384

    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8")

settings = Settings()
