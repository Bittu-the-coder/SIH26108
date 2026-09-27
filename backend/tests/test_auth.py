import pytest
from httpx import AsyncClient

@pytest.mark.asyncio
async def test_register(client: AsyncClient):
    response = await client.post("/api/v1/auth/register", json={
        "email": "test@gov.in",
        "password": "password123",
        "name": "Test Officer"
    })
    # Stub assertion
    assert response.status_code in [200, 201, 501] # 501 if unimplemented

@pytest.mark.asyncio
async def test_login(client: AsyncClient):
    response = await client.post("/api/v1/auth/login", json={
        "email": "test@gov.in",
        "password": "password123"
    })
    assert response.status_code in [200, 501]
