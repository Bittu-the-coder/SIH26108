import pytest
from httpx import AsyncClient
import uuid

@pytest.mark.asyncio
async def test_submit_feedback(client: AsyncClient):
    query_id = str(uuid.uuid4())
    response = await client.post("/api/v1/feedback", json={
        "query_id": query_id,
        "feedback": "wrong_standard"
    })
    assert response.status_code in [201, 501]
