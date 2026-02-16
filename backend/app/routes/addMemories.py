from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional, Dict, Any
from app.memory_client import get_memory_client

router = APIRouter()

class AddMemoryRequest(BaseModel):
    workSpace: str
    content: str
    metadata: Optional[Dict[str, Any]] = {}

@router.post("/addMemories")
def add_memories(req: AddMemoryRequest):
    """
    添加记忆
    - workSpace: 工作区名称
    - content: 记忆内容
    - metadata: 可选的元数据(如category)
    """
    try:
        m = get_memory_client()
        messages = [{"role": "user", "content": req.content}]
        
        
        result = m.add(
            messages=messages,
            user_id=req.workSpace,
            metadata=req.metadata
        )
        
        print(req, result)

        return {
            "success": True,
            "data": result
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
