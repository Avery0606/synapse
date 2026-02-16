from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.memory_client import get_memory_client

router = APIRouter()

class DeleteMemoryRequest(BaseModel):
    memoryId: str

@router.post("/deleteMemory")
def delete_memory(req: DeleteMemoryRequest):
    """
    删除记忆
    - memoryId: 记忆ID
    """
    try:
        m = get_memory_client()
        
        m.delete(memory_id=req.memoryId)
        
        return {
            "success": True,
            "message": "Memory deleted successfully"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
