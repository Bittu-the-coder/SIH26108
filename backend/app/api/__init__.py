from fastapi import APIRouter
from .recommend import router as recommend_router
from .standards import router as standards_router
from .categories import router as categories_router
from .feedback import router as feedback_router
from .auth import router as auth_router
from .eval import router as eval_router

api_router = APIRouter()
api_router.include_router(recommend_router, prefix="/recommend", tags=["recommend"])
api_router.include_router(standards_router, prefix="/standards", tags=["standards"])
api_router.include_router(categories_router, prefix="/categories", tags=["categories"])
api_router.include_router(feedback_router, prefix="/feedback", tags=["feedback"])
api_router.include_router(auth_router, prefix="/auth", tags=["auth"])
api_router.include_router(eval_router, prefix="/eval", tags=["eval"])
