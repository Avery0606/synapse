from fastapi import APIRouter, HTTPException
from app.memory_client import get_memory_client

router = APIRouter()

@router.get("/init")
def init_memory():
    """
    初始化mem0客户端
    首次调用时初始化，后续直接返回
    """
    try:
        m = get_memory_client()
        return {
            "success": True,
            "message": "Memory client initialized successfully"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
