# Synapse

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub stars](https://img.shields.io/github/stars/Avery0606/synapse.svg)](https://github.com/Avery0606/synapse/stargazers)

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
- **计划模式**：多种规划策略，包括默认、原子版、苏格拉底版和澄清版。帮助制定详细开发计划，避免遗漏。
- **技能集成**：可扩展的技能系统，支持按需加载专业能力。目前内置高价值 meta-skill，包括：
  - `skill-refiner`：迭代优化其他 skill 的提示词与结构
  - `soul-refiner`：深度打磨 AI 代理的 SOUL.md 人格文件，让代理真正像可靠的队友
- **深度初始化**：自动设置项目文档。快速生成 AGENTS.md，建立项目基础。
- **自我改进**：基于交互的持续优化项目指南。学习用户习惯，不断提升团队表现。

## 📦 安装

### 先决条件

- Node.js（版本 14 或更高）
- OpenCode 环境
- Git

### 安装

1. 克隆仓库：

```bash
git clone https://github.com/Avery0606/synapse.git
```

2. 在 `opencode.json` 中添加：

```json
{
  "plugin": ["file:///<path-to>/synapse/opencode-plugin/index.ts"]
}
```

4. 进入项目安装依赖
```bash
cd synapse
npm run bootstrap
```

3. 复制skills到本地：

```bash
npm run setup-skills
```

## 📖 使用指南

### 快速开始

1. 安装并配置插件后，运行 `/deep-init` 初始化项目文档。
2. 输入你的需求，例如：`添加用户登录功能`。
3. Synapse 会自动进入规划模式，协调 Oracle（定位）、Ares（执行）、Inspector（检查）完成任务。
4. 完成后运行 `/self-improving` 自动优化项目文档。

### 常用命令

- `/deep-init` — 初始化 AGENTS.md
- `/plan <需求>` — 默认规划模式
- `/plan-atomic <需求>` — 第一性原理规划
- `/plan-socratic <需求>` — 苏格拉底式交互规划
- `/plan-clarify <需求>` — 澄清版规划
- `/self-improving` — 自我优化文档
- `/apply-skill <name>` — 加载指定 skill

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
- `/plan-atomic <desc>`：第一性原理规划。
- `/plan-socratic <desc>`：苏格拉底规划。
- `/plan-clarify <desc>`：澄清版规划，融合三层思维系统。
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