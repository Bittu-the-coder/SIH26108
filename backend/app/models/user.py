from sqlmodel import SQLModel, Field
from typing import Optional
import uuid
from datetime import datetime, timezone

def get_utc_now():
    return datetime.now(timezone.utc)

class User(SQLModel, table=True):
    __tablename__ = "users"

    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    email: str = Field(unique=True, index=True)
    password_hash: str
    name: Optional[str] = None
    role: str = Field(default="user")
    is_active: bool = Field(default=True)
    created_at: datetime = Field(default_factory=get_utc_now, nullable=False)

class ApiKey(SQLModel, table=True):
    __tablename__ = "api_keys"

    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    key_hash: str = Field(unique=True, index=True)
    name: str
    is_active: bool = Field(default=True)
    rate_limit: int = Field(default=60)
    created_at: datetime = Field(default_factory=get_utc_now, nullable=False)
    expires_at: Optional[datetime] = None
