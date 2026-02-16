from fastapi import APIRouter, HTTPException, Query
from pydantic import BaseModel
from typing import Optional
from app.memory_client import get_memory_client

router = APIRouter()

class GetMemoryRequest(BaseModel):
    workSpace: str
    query: Optional[str] = None
    threshold: Optional[float] = 0
    category: Optional[str] = None

@router.post("/getMemories")
def get_memories(req: GetMemoryRequest):
    """
    获取记忆
    - 只传workSpace: 获取该工作区所有记忆
    - 传query: 执行语义搜索
    - threshold: 相似度分数阈值(0-1)
    - category: 按metadata.category过滤
    """
    try:
        m = get_memory_client()
        
        # 构建filters
        filters = {}
        if req.category:
            filters["category"] = {"eq": req.category}
        
        # 如果有query参数，执行搜索
        if req.query:
            result = m.search(
                query=req.query,
                user_id=req.workSpace,
                threshold=req.threshold,
                filters=filters if filters else None
            )
        else:
            # 获取所有记忆
            result = m.get_all(
                user_id=req.workSpace,
                filters=filters if filters else None
            )
        
        return {
            "success": True,
            "data": result
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
