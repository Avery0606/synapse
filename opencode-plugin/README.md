# synapse-code-team

OpenCode AI 开发团队插件，内置 Synapse（领导者）、Oracle（代码定位）、Ares（任务执行）、Inspector（质量检查）四个智能体。

## 安装

```bash
npm install synapse-code-team
```

安装后执行一次 skills 初始化：

```bash
npx synapse-setup-skills
```

## 配置

在你的 `opencode.json` 中添加：

```json
{
  "plugin": ["synapse-code-team"]
}
```

## 常用命令

- `/deep-init` — 深度初始化项目 AGENTS.md
- `/plan <需求>` — 进入计划模式
- `/plan-atomic <需求>` — 第一性原理规划
- `/plan-socratic <需求>` — 苏格拉底式规划
- `/plan-clarify <需求>` — 澄清版规划
- `/self-improving` — 自我优化项目文档
- `/apply-skill <skill-name>` — 加载指定 skill

## Skills

插件自带多个实用 skills（AGENTS.md 创建、测试用例生成、代码清洁等）。

安装后请务必运行：

```bash
npx synapse-setup-skills
```

## 更多文档

完整使用指南、开发贡献、架构说明请访问：

https://github.com/Avery0606/synapse
