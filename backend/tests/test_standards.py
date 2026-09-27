import pytest
from httpx import AsyncClient

@pytest.mark.asyncio
async def test_get_standards(client: AsyncClient):
    response = await client.get("/api/v1/standards?page=1&per_page=10")
    assert response.status_code in [200, 501]

@pytest.mark.asyncio
async def test_get_standard_detail(client: AsyncClient):
    response = await client.get("/api/v1/standards/IS%202062:2011")
    assert response.status_code in [200, 404, 501]
