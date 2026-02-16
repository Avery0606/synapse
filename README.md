# Memory Management System

基于 mem0 + Qdrant 的记忆管理系统，支持语义搜索、分类过滤等功能。

## 系统架构

```
agent-memory/
├── backend/                      # 后端 (Python + FastAPI)
│   ├── app/
│   │   ├── main.py              # FastAPI 入口
│   │   ├── config.py            # 配置文件加载
│   │   ├── memory_client.py    # mem0 单例客户端
│   │   └── routes/             # API 路由
│   │       ├── init.py         # 初始化接口
│   │       ├── addMemories.py  # 添加记忆
│   │       ├── getMemories.py  # 获取/搜索记忆
│   │       ├── updateMemory.py # 更新记忆
│   │       └── deleteMemory.py # 删除记忆
│   ├── mem0-config.yaml        # mem0 配置
│   └── requirements.txt        # Python 依赖
├── frontend/                    # 前端 (Vue 3 + Vite + Element Plus)
│   ├── src/
│   │   ├── main.js
│   │   ├── App.vue
│   │   ├── api/               # API 调用
│   │   └── components/        # Vue 组件
│   └── package.json
├── mem0-dev-docs/             # mem0 开发文档
└── .gitignore
```

## 环境依赖

### 后端依赖
- Python 3.8+
- **Qdrant**: 向量数据库 (默认 localhost:6333)

### 前端依赖
- Node.js 16+
- npm

## 快速开始

### 1. 启动 Qdrant

```bash
# 使用 Docker 启动 Qdrant
docker run -d --name qdrant -p 6333:6333 -p 6334:6333 qdrant/qdrant

# 或使用 Windows 可执行文件
# 下载 https://github.com/qdrant/qdrant/releases
```

### 2. 设置环境变量

```bash
# Windows PowerShell
$env:MINIMAX_API_KEY="your-api-key"

# Windows CMD
set MINIMAX_API_KEY=your-api-key

# Linux/Mac
export MINIMAX_API_KEY=your-api-key
```

### 3. 启动后端

```bash
cd backend

# 创建虚拟环境 (可选)
python -m venv venv
venv\Scripts\activate  # Windows

# 安装依赖
pip install -r requirements.txt

# 启动服务
python -m uvicorn app.main:app --reload --port 8000
```

### 4. 启动前端

```bash
cd frontend

# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 或构建生产版本
npm run build
```

### 5. 访问系统

打开浏览器访问: http://localhost:3000

## API 接口

| 接口 | 方法 | 路径 | 说明 |
|------|------|------|------|
| init | GET | `/api/init` | 初始化 mem0 客户端 |
| addMemories | POST | `/api/addMemories` | 添加记忆 |
| getMemories | POST | `/api/getMemories` | 获取/搜索记忆 |
| updateMemory | POST | `/api/updateMemory` | 更新记忆 |
| deleteMemory | POST | `/api/deleteMemory` | 删除记忆 |

### 接口详情

#### 添加记忆
```json
POST /api/addMemories
{
  "workSpace": "workspace-name",
  "content": "记忆内容",
  "metadata": {"category": "category-name"}
}
```

#### 获取记忆
```json
POST /api/getMemories
{
  "workSpace": "workspace-name"
}

# 或搜索
{
  "workSpace": "workspace-name",
  "query": "搜索内容",
  "threshold": 0.5,
  "category": "category-name"
}
```

#### 更新记忆
```json
POST /api/updateMemory
{
  "memoryId": "memory-id",
  "content": "新内容"
}
```

#### 删除记忆
```json
POST /api/deleteMemory
{
  "memoryId": "memory-id"
}
```

## 配置说明

### mem0-config.yaml

```yaml
llm:
  provider: openai
  config:
    model: MiniMax-M2.5
    openai_base_url: https://api.minimax.io/v1
    api_key: your-api-key

embedder:
  provider: openai
  config:
    model: embo-01
    openai_base_url: https://api.minimax.io/v1
    api_key: your-api-key
    embedding_model_dims: 1024

vector_store:
  provider: qdrant
  config:
    host: localhost
    port: 6333
    embedding_model_dims: 1024
```

### 支持的 Embedder

- **Ollama**: 本地 embedding 模型
- **OpenAI**: OpenAI-compatible API (如 MiniMax, LM Studio 等)
- **Hugging Face**: Hugging Face embedding 模型

### 支持的 Vector Store

- **Qdrant**: 向量数据库 (推荐)
- **FAISS**: Facebook AI Similarity Search
- 其他: Chroma, Pinecone, Weaviate 等

## 功能特性

- [x] 工作区隔离 (通过 user_id 实现)
- [x] 语义搜索
- [x] 相似度分数过滤
- [x] 分类过滤 (通过 metadata)
- [x] 记忆 CRUD 操作
- [x] 前端初始化加载提示

## 注意事项

1. 首次初始化需要加载 embedding 模型，可能耗时较长
2. 确保 Qdrant 服务已启动
3. LLM 和 Embedder 的维度必须一致，否则会报错
