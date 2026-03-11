# Frontend

记忆系统的 Vue 3 + Vite 管理前端，提供记忆的查看、添加、编辑、删除等功能。

## 项目业务背景

frontend 是记忆系统的管理页面，用于管理已有记忆，包括查看记忆列表、搜索记忆、添加新记忆、编辑记忆内容、删除错误记忆等操作。

## 关键文件快速导航

| 文件 | 说明 |
|------|------|
| `src/main.js` | Vue 入口 |
| `src/App.vue` | 根组件，包含主布局 |
| `src/api/index.js` | API 调用封装 |
| `src/components/MemoryList.vue` | 记忆列表组件 |
| `src/components/MemorySearch.vue` | 记忆搜索组件 |
| `src/components/MemoryEdit.vue` | 记忆编辑组件 |
| `src/components/WorkspaceSelector.vue` | 工作区选择组件 |

## 常用命令

```bash
cd frontend

# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build
```

## 页面功能

- **工作区切换**: 支持多工作区隔离
- **添加记忆**: 输入内容并添加元数据标签
- **搜索记忆**: 支持语义搜索和元数据过滤
- **记忆列表**: 展示所有记忆，支持排序
- **编辑/删除**: 对已有记忆进行修改或删除
