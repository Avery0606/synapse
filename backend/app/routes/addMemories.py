from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, field_validator
from typing import Optional, Dict, Any, List
from app.memory_client import get_memory_client

router = APIRouter()

class MessageItem(BaseModel):
    role: str
    content: str

class AddMemoryRequest(BaseModel):
    workSpace: str
    messages: List[MessageItem]
    metadata: Optional[Dict[str, Any]] = None

@router.post("/addMemories")
def add_memories(req: AddMemoryRequest):
    """
    添加记忆
    - workSpace: 工作区名称
    - messages: 记忆内容列表 [{"role": "user", "content": "..."}, ...]
    - metadata: 可选的元数据(如category)
    """
    try:
        print("[记忆] 记忆添加中...")
        m = get_memory_client()
        
        messages_list = [msg.model_dump() for msg in req.messages]
        result = m.add(
            messages_list,
            user_id=req.workSpace,
            metadata=req.metadata if req.metadata else {}
        )
        print("[记忆] 记忆添加完成")
        return {
            "success": True,
            "data": result
        }
    except Exception as e:
        import traceback
        raise HTTPException(status_code=500, detail={
            "error": str(e),
            "type": type(e).__name__
        })
