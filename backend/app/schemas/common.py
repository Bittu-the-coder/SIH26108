from pydantic import BaseModel
from typing import List, Generic, TypeVar, Optional, Any

T = TypeVar("T")

class PaginatedResponse(BaseModel, Generic[T]):
    total: int
    page: int
    per_page: int
    results: List[T]

class WarningItem(BaseModel):
    type: str
    message: str

class MetadataInfo(BaseModel):
    retrieval_method: str
    llm_model: str
    total_latency_ms: int
