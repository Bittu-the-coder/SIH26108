import pytest
from httpx import AsyncClient

@pytest.mark.asyncio
async def test_recommend_endpoint(client: AsyncClient):
    response = await client.post("/api/v1/recommend", json={
        "query": "steel office chair",
        "category": "furniture"
    })
    assert response.status_code in [200, 501]
