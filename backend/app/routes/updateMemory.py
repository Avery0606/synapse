from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.memory_client import get_memory_client

router = APIRouter()

class UpdateMemoryRequest(BaseModel):
    memoryId: str
    content: str

@router.post("/updateMemory")
def update_memory(req: UpdateMemoryRequest):
    """
    更新记忆
    - memoryId: 记忆ID
    - content: 新的记忆内容
    """
    try:
        m = get_memory_client()
        
        m.update(
            memory_id=req.memoryId,
            data=req.content
        )
        
        return {
            "success": True,
            "message": "Memory updated successfully"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
