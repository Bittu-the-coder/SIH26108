from sqlmodel import SQLModel, Field, Column
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy import Enum
from pgvector.sqlalchemy import Vector
from typing import Optional, Dict, Any
import enum
import uuid
from datetime import datetime

class StandardStatus(str, enum.Enum):
    current = 'current'
    superseded = 'superseded'
    withdrawn = 'withdrawn'
    under_revision = 'under_revision'

class CertScheme(str, enum.Enum):
    isi_mark = 'isi_mark'
    crs = 'crs'
    hallmarking = 'hallmarking'
    qco = 'qco'
    none = 'none'

class Standard(SQLModel, table=True):
    __tablename__ = "standards"

    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    is_number: str = Field(unique=True, index=True)
    is_number_base: str = Field(index=True)
    title: str
    title_hi: Optional[str] = None
    scope: Optional[str] = None
    classification: str
    sub_group: Optional[str] = None
    
    status: StandardStatus = Field(
        sa_column=Column(Enum(StandardStatus), default=StandardStatus.current, nullable=False)
    )
    year_published: Optional[int] = None
    latest_amendment: Optional[str] = None
    
    certification: CertScheme = Field(
        sa_column=Column(Enum(CertScheme), default=CertScheme.none, nullable=False)
    )
    qco_details: Optional[str] = None
    source_url: Optional[str] = None
    
    embedding: Optional[Any] = Field(default=None, sa_column=Column(Vector(384)))
    
    raw_metadata: Optional[Dict[str, Any]] = Field(default=None, sa_column=Column(JSONB))
    
    created_at: datetime = Field(default_factory=datetime.utcnow, nullable=False)
    updated_at: datetime = Field(default_factory=datetime.utcnow, nullable=False)
