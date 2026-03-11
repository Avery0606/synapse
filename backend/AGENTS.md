# Backend

记忆系统的 Python + FastAPI 后端，基于 mem0 技术提供记忆管理接口。

## 项目业务背景

backend 是记忆系统的后台服务，基于 mem0 技术实现，提供获取记忆、添加记忆、更新记忆、删除记忆等关键接口，支持语义搜索和元数据过滤。

## 关键文件快速导航

| 文件 | 说明 |
|------|------|
| `app/main.py` | FastAPI 入口，注册路由和 CORS 配置 |
| `app/memory_client.py` | mem0 单例客户端 |
| `app/config.py` | 配置文件加载 |
| `app/routes/getMemories.py` | 获取/搜索记忆接口 |
| `app/routes/addMemories.py` | 添加记忆接口 |
| `app/routes/updateMemory.py` | 更新记忆接口 |
| `app/routes/deleteMemory.py` | 删除记忆接口 |
| `app/routes/getMetadataFields.py` | 获取元数据字段接口 |
| `mem0-config.yaml` | mem0 配置 (LLM/Embedder/VectorStore) |

## API 接口

| 接口 | 方法 | 路径 | 说明 |
|------|------|------|------|
| 获取记忆 | POST | `/api/getMemories` | 获取/搜索记忆，支持语义搜索和元数据过滤 |
| 添加记忆 | POST | `/api/addMemories` | 添加记忆 |
| 更新记忆 | POST | `/api/updateMemory` | 更新记忆 |
| 删除记忆 | POST | `/api/deleteMemory` | 删除记忆 |
| 获取元数据字段 | GET | `/api/getMetadataFields` | 获取可用元数据字段 |

## 常用命令

```bash
cd backend

# 创建虚拟环境
python -m venv venv
venv\Scripts\activate

# 安装依赖
pip install -r requirements.txt

# 启动服务
python -m uvicorn app.main:app --reload --port 8000
```
