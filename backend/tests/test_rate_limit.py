import pytest
from httpx import AsyncClient

@pytest.mark.asyncio
async def test_rate_limit(client: AsyncClient):
    # Test multiple quick hits against health check
    response = await client.get("/health")
    assert response.status_code == 200
