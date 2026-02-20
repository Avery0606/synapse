from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from app.routes import addMemories, getMemories, updateMemory, deleteMemory, init, getMetadataFields

# 加载 .env 文件
load_dotenv()

app = FastAPI(title="Memory Management API")

# CORS配置
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 注册路由
app.include_router(init.router, prefix="/api", tags=["Init"])
app.include_router(addMemories.router, prefix="/api", tags=["Memories"])
app.include_router(getMemories.router, prefix="/api", tags=["Memories"])
app.include_router(getMetadataFields.router, prefix="/api", tags=["Memories"])
app.include_router(updateMemory.router, prefix="/api", tags=["Memories"])
app.include_router(deleteMemory.router, prefix="/api", tags=["Memories"])

@app.get("/")
def root():
    return {"message": "Memory Management API is running"}

@app.get("/health")
def health():
    return {"status": "ok"}
