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
        
        # 构建filters - mem0 v2.x 使用直接值格式，不用 {"eq": value}
        filters = {}
        if req.category:
            filters["category"] = req.category
        
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
        
        # 按创建时间降序排序（越新的排在前面）
        if isinstance(result, dict) and "results" in result:
            result["results"] = sorted(
                result["results"],
                key=lambda x: x.get("created_at", ""),
                reverse=True
            )
        elif isinstance(result, list):
            result = sorted(
                result,
                key=lambda x: x.get("created_at", ""),
                reverse=True
            )
        
        return {
            "success": True,
            "data": result
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail={
            "error": str(e),
            "type": type(e).__name__
        })
