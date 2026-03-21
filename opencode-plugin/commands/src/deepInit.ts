const template = `
深度生成项目 AGENTS.md 文件。

## 第1步：扫描项目结构

扫描项目根目录及所有子目录，识别：
- 项目技术栈（编程语言、框架、构建工具等）
- 关键目录（包含核心业务逻辑、配置文件、测试代码等的目录）
- 目录层级结构和组织方式

扫描完成后，向用户展示识别出的关键目录列表，并询问是否需要补充。

## 第2步：根目录 AGENTS.md 生成

使用 agents-md-creator skill 生成根目录的 AGENTS.md。

## 第3步：关键目录 AGENTS.md 生成

对每个关键目录，使用 agents-md-creator skill 生成子目录的 AGENTS.md。

## 第4步：完成总结

完成所有 AGENTS.md 文件生成后，向用户总结。
`

const command = {
    description: "深度生成项目根目录及关键目录的 AGENTS.md 文件",
    template,
}

export default command