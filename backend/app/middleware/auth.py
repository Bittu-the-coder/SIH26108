from fastapi import Depends, HTTPException, status, Request
from fastapi.security import OAuth2PasswordBearer
from sqlmodel.ext.asyncio.session import AsyncSession
from app.database import get_session
from app.models.user import User, ApiKey
from sqlmodel import select

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="api/v1/auth/login")

async def get_current_user(
    token: str = Depends(oauth2_scheme), 
    session: AsyncSession = Depends(get_session)
) -> User:
    # Stub: decoding JWT and looking up user
    raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)

async def verify_api_key(
    request: Request,
    session: AsyncSession = Depends(get_session)
) -> ApiKey:
    api_key_header = request.headers.get("X-API-Key")
    if not api_key_header:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Missing API Key")
    # Stub: fetch key from DB
    raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid API Key")

async def require_auth(
    request: Request,
    session: AsyncSession = Depends(get_session)
):
    # Stub: check both mechanisms
    pass

async def require_admin(
    current_user: User = Depends(get_current_user)
):
    if current_user.role != "admin":
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not enough privileges")
    return current_user
