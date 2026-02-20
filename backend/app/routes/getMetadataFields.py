from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Dict, Any, Set
from app.memory_client import get_memory_client

router = APIRouter()

class GetMetadataFieldsRequest(BaseModel):
    workSpace: str

@router.post("/getMetadataFields")
def get_metadata_fields(req: GetMetadataFieldsRequest):
    """
    获取工作区已使用的 metadata 字段和值
    - 遍历该工作区所有记忆，提取 metadata 的 key 和 unique values
    """
    try:
        m = get_memory_client()
        
        # 获取该工作区所有记忆
        result = m.get_all(user_id=req.workSpace)
        
        # 解析 metadata fields 和 values
        metadata_fields: Dict[str, Set[Any]] = {}
        
        # 统一处理 dict 和 list 两种返回格式
        memories = []
        if isinstance(result, dict):
            memories = result.get("results", [])
        elif isinstance(result, list):
            memories = result
        
        for memory in memories:
            if not isinstance(memory, dict):
                continue
            
            metadata = memory.get("metadata", {})
            if not metadata:
                continue
                
            for key, value in metadata.items():
                if key not in metadata_fields:
                    metadata_fields[key] = set()
                
                # 处理不同类型的 value
                if isinstance(value, list):
                    # 列表类型：展开添加所有元素
                    for item in value:
                        metadata_fields[key].add(str(item))
                elif value is not None:
                    # 其他类型：直接添加
                    metadata_fields[key].add(value)
        
        # 转换为 JSON 兼容格式
        metadata_fields_json = {
            key: list(values) for key, values in metadata_fields.items()
        }
        
        return {
            "success": True,
            "data": {
                "fields": metadata_fields_json,
                "total_fields": len(metadata_fields_json),
                "total_memories": len(memories)
            }
        }
    except Exception as e:
        import traceback
        raise HTTPException(status_code=500, detail={
            "error": str(e),
            "type": type(e).__name__,
            "traceback": traceback.format_exc()
        })
