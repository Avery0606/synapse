# Synapse

```
   _____                       ____
   / ___/____  ____  ____ ___  / __/
   \__ \/ __ \/ __ \/ __ `__ \/ /_
  ___/ / /_/ / /_/ / / / / / / __/
 /____/\____/\____/_/ /_/ /_/_/
```

## 🚀 革新您的编码工作流程

**Synapse** 是一个创新的 OpenCode 插件，它组建了一个高效的 AI 开发团队，以提升您的编码体验。配备智能角色，如领导者（Synapse）、代码定位专家（Oracle）、执行者（Ares）和检查员（Inspector），它将复杂的开发任务转化为流畅的协作过程。

无论您是在构建新功能、重构代码还是调试问题，Synapse 都能确保每一步的精确性、高效性和质量。

## ✨ 功能特性

- **智能团队协作**：自动调度 AI 代理，实现无缝任务执行。
- **代码定位**：通过 Oracle 进行精确的代码查找和解释。
- **任务执行**：由 Ares 处理可靠的代码操作。
- **质量保证**：由 Inspector 进行全面的代码审查。
- **计划模式**：多种规划策略，包括默认、第一性原理和苏格拉底方法。
- **技能集成**：可扩展的技能，用于专门任务，如清洁代码和 AGENTS.md 创建。
- **深度初始化**：自动设置项目文档。
- **自我改进**：基于交互的持续优化项目指南。

## 📦 安装与快速开始

### 先决条件

- Node.js（版本 14 或更高）
- OpenCode 环境
- Git

### 快速安装（推荐）

如果您已克隆仓库并熟悉 OpenCode：

1. **安装依赖**：
   ```bash
   npm run bootstrap
   ```

2. **配置插件**：
   添加到您的 `opencode.json`：
   ```json
   "plugin": [
     "file:///D:/git-project/synapse/opencode-plugin/index.ts"
   ]
   ```

3. **设置技能**：
   ```bash
   npm run setup-skills
   ```

4. **初始化项目**：
   在您的 OpenCode 环境中运行 `/deep-init`。

5. **开始开发**：
   使用 `/plan <description>` 启动您的 AI 辅助编码会话！

### 详细安装步骤

如果这是您首次使用：

1. **克隆仓库**：
   ```bash
   git clone https://github.com/your-repo/synapse.git
   cd synapse
   ```

2. **安装根目录和插件依赖**：
   ```bash
   npm run bootstrap
   ```
   此命令为根目录和 `opencode-plugin` 子目录安装依赖。

3. **配置 OpenCode**：
   找到您的 `opencode.json` 文件并添加插件：
   ```json
   {
     "plugin": [
       "file:///D:/git-project/synapse/opencode-plugin/index.ts"
     ]
   }
   ```
   将路径替换为实际绝对路径。

4. **设置技能目录**：
   ```bash
   npm run setup-skills
   ```
   这会将所有技能从 `opencode-plugin/skills/` 复制到您的 `.opencode/skills/` 目录，而不覆盖现有文件。

5. **可选：安装额外技能**：
   为增强功能，安装这些推荐技能：
   - `skill-creator`
   - `clean-code`

6. **验证安装**：
   重新启动您的 OpenCode 环境，并在命令面板中检查 Synapse 命令。

## 📖 使用指南

### 工作流程概述

遵循此流畅过程以获得最佳结果：

1. **初始化**：运行 `/deep-init` 以深度初始化项目 AGENTS.md 文件，建立坚实的文档基础。

2. **规划**：对于复杂需求，使用以下之一进入计划模式：
   - `/plan <description>` — 全面规划与完整评估。
   - `/plan-simple <description>` — 基于第一性原理的最小步骤。
   - `/plan-socratic <description>` — 通过苏格拉底提问进行交互式规划。

3. **执行**：确认您的计划，让 Synapse 协调团队：
   - **Oracle**：定位和解释代码。
   - **Ares**：执行代码更改。
   - **Inspector**：审查和验证代码质量。

4. **优化**：完成后，运行 `/self-improving` 以提取见解并自动更新 AGENTS.md。

5. **增强**：在对话期间，使用 `/apply-skill <skill-name>` 加载如 `clean-code` 或 `agents-md-creator` 等技能。

### 团队角色

| 代理     | 角色描述 |
|-----------|------------------|
| Synapse   | 协调调度和策略的团队领导者。 |
| Oracle    | 用于精确定位和解释的代码专家。 |
| Ares      | 处理代码操作的任务执行者。 |
| Inspector | 确保代码标准的质量检查员。 |

### 命令参考

- `/deep-init`：初始化 AGENTS.md 文件。
- `/plan <desc>`：进入默认规划模式。
- `/plan-simple <desc>`：第一性原理规划。
- `/plan-socratic <desc>`：苏格拉底规划。
- `/self-improving`：优化项目文档。
- `/apply-skill <name>`：加载特定技能。

## 🤝 贡献

我们欢迎社区的贡献！以下是您如何参与的方式：

### 开发设置

1. Fork 仓库。
2. 创建功能分支：`git checkout -b feature/your-feature`。
3. 进行更改并确保 TypeScript 检查通过：`npx tsc --noEmit`。
4. 提交更改：`git commit -m "Add your feature"`。
5. 推送到您的分支：`git push origin feature/your-feature`。
6. 打开拉取请求。

### 指南

- 遵循现有的代码风格和结构。
- 为新功能添加测试。
- 根据需要更新文档。
- 如果需要，确保所有提交都已签名。

### 报告问题

发现错误？有功能请求？在 GitHub 上打开问题，并提供详细信息。

## 📄 许可证

本项目根据 MIT 许可证授权 - 有关详细信息，请参阅 [LICENSE](LICENSE) 文件。

---

*由 Synapse 团队用 ❤️ 构建*