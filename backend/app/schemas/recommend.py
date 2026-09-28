from pydantic import BaseModel
from typing import List, Optional, Any
import uuid
from .common import WarningItem, MetadataInfo

class RecommendRequest(BaseModel):
    query: str
    category: Optional[str] = None
    top_k: int = 5
    include_allied: bool = True
    language: Optional[str] = None

class CertificationInfo(BaseModel):
    scheme: Optional[str] = "none"
    mandatory: Optional[bool] = False
    details: Optional[str] = None

class AlliedStandard(BaseModel):
    is_number: str
    title: str
    relationship: Optional[str] = "allied"
    reason: Optional[str] = None

class Recommendation(BaseModel):
    is_number: str
    title: str
    status: Optional[str] = "current"
    confidence: Optional[float] = 0.85
    match_reason: Optional[str] = ""
    source_url: Optional[str] = None
    certification: Optional[CertificationInfo] = None
    supersession: Optional[str] = None
    allied_standards: List[AlliedStandard] = []

class RecommendResponse(BaseModel):
    query_id: uuid.UUID
    detected_language: str
    recommendations: List[Recommendation]
    warnings: List[WarningItem] = []
    metadata: Optional[MetadataInfo] = None
