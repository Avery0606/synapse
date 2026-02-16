from mem0 import Memory
from app.config import load_config

_memory_client = None

def get_memory_client():
    """获取mem0单例客户端"""
    global _memory_client
    if _memory_client is None:
        config = load_config()
        _memory_client = Memory.from_config(config)
    return _memory_client
