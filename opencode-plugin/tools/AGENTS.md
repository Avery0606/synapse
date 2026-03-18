# opencode-plugin/tools/

**目录简介**: 业务模块，自定义工具目录，定义 AI 开发团队可使用的自定义工具

# 关键架构列表
- index.ts：工具注册入口
- src/：工具实现源码目录
- src/talk-to.ts：团队成员通信工具，用于 Agent 间消息传递
- src/get-latest-message.ts：获取成员最新消息的工具
- store/：状态存储目录，根据 parentSessionId 隔离存储子会话数据

# 开发约束
- 新增工具规范：新增或删除工具，需要在 src 目录下操作，并在 index.ts 中注册

# 注意事项
- 暂无
