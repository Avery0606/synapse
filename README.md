# Synapse

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub stars](https://img.shields.io/github/stars/your-repo/synapse.svg)](https://github.com/your-repo/synapse/stargazers)
[![Build Status](https://img.shields.io/github/actions/workflow/status/your-repo/synapse/ci.yml)](https://github.com/your-repo/synapse/actions)

```
S Y N A P S E
```

## 🚀 革新您的编码工作流程

**Synapse** 是一个强大的 AI 代码开发团队插件，为 OpenCode 环境打造。它整合了智能 AI 角色——领导者（Synapse）、代码定位专家（Oracle）、任务执行者（Ares）和代码质量检查员（Inspector）——将复杂的开发任务转化为高效的团队协作。

无论是构建新功能、重构遗留代码，还是调试棘手问题，Synapse 都能确保您的代码开发过程精准、高效且高质量。通过 AI 驱动的智能调度，减少手动操作，提升开发效率，让您专注于创造性工作。

## ✨ 功能特性

- **智能团队协作**：自动调度 AI 代理，实现无缝任务执行。减少手动切换，节省开发时间高达50%。
- **代码定位**：通过 Oracle 进行精确的代码查找和解释。快速定位 Bug 或逻辑链路，提升调试效率。
- **任务执行**：由 Ares 处理可靠的代码操作。批量修改、格式化，无需担心语法错误。
- **质量保证**：由 Inspector 进行全面的代码审查。包括安全检查、性能分析，确保代码符合标准。
- **计划模式**：多种规划策略，包括默认、第一性原理和苏格拉底方法。帮助制定详细开发计划，避免遗漏。
- **技能集成**：可扩展的技能，用于专门任务，如清洁代码和 AGENTS.md 创建。按需加载，增强特定功能。
- **深度初始化**：自动设置项目文档。快速生成 AGENTS.md，建立项目基础。
- **自我改进**：基于交互的持续优化项目指南。学习用户习惯，不断提升团队表现。

## 📦 安装

### 先决条件

- Node.js（版本 14 或更高）
- OpenCode 环境
- Git

### 安装步骤

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

### 快速开始

1. 安装完成后，打开 OpenCode 并运行 `/deep-init` 初始化项目文档。
2. 输入需求，如 "添加一个用户登录功能"，Synapse 会自动规划并执行。
3. 团队角色协同工作：Oracle 定位代码，Ares 修改，Inspector 检查。
4. 完成后，运行 `/self-improving` 优化文档。

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

## ❓ 常见问题 (FAQ)

- **Synapse 支持哪些编程语言？**  
  主要支持 TypeScript 和 JavaScript，但可扩展到其他语言。

- **如何自定义 AI 团队角色？**  
  修改 `opencode-plugin/agents/` 下的角色定义文件。

- **性能如何？影响开发速度吗？**  
  AI 处理异步执行，不阻塞主流程，实际提升效率。

- **这是开源项目吗？**  
  是的，根据 MIT 许可证开源。

- **如何报告 Bug 或请求功能？**  
  在 GitHub Issues 中提交，附上详细信息。

- **需要付费吗？**  
  完全免费，开源贡献。

- **兼容哪些 OpenCode 版本？**  
  支持最新稳定版，详情见安装指南。

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