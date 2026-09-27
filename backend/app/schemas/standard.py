from pydantic import BaseModel
from typing import List, Optional, Dict
import uuid

class StandardSearchParams(BaseModel):
    q: Optional[str] = None
    category: Optional[str] = None
    status: Optional[str] = None
    certification: Optional[str] = None
    page: int = 1
    per_page: int = 20

class StandardBase(BaseModel):
    is_number: str
    title: str
    status: str
    classification: str

class StandardDetail(StandardBase):
    id: uuid.UUID
    title_hi: Optional[str] = None
    scope: Optional[str] = None
    sub_group: Optional[str] = None
    year_published: Optional[int] = None
    latest_amendment: Optional[str] = None
    certification: str
    source_url: Optional[str] = None
    cross_references: Dict[str, List[str]] = {}
    categories: List[str] = []
