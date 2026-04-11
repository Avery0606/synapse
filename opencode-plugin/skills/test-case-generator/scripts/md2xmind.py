#!/usr/bin/env python
"""
将 Markdown 列表结构转换为 XMind 文件。

用法:
  md2xmind file.md output.xmind
  md2xmind --title "My Mind Map" input.md output.xmind
"""

from __future__ import annotations
import argparse
import json
import re
import sys
import zipfile
from typing import Any
from uuid import uuid4


def error(*args: object) -> None:
    print(*args, file=sys.stderr)


def new_id() -> str:
    return str(uuid4())


def parse_line(line: str) -> tuple[int, str] | None:
    """解析 Markdown 行，返回 (缩进层级, 内容) 或 None。
    
    缩进: 2空格或1tab为一级，0-based。
    """
    stripped = line.lstrip()
    if not stripped.startswith('-'):
        return None
    
    # 计算缩进层级
    indent = len(line) - len(stripped)
    depth = line[:indent].count('\t') if '\t' in line[:indent] else indent // 2
    
    # 提取内容（去掉 "- " 前缀和层级编号）
    content = re.sub(r'^(\d+\.)+\s*', '', stripped[1:].strip())
    
    return depth, content


def build_tree(markdown: str) -> list[dict]:
    """将 Markdown 解析为 XMind 风格的树结构。"""
    root_topics: list[dict] = []
    stack: list[dict] = []  # 维护从根到当前节点的路径
    
    for line in markdown.strip().split('\n'):
        line = line.rstrip()
        if not line:
            continue
        
        result = parse_line(line)
        if not result:
            continue
        depth, text = result
        
        topic = {"id": new_id(), "title": text, "children": {"attached": []}}
        
        if depth == 0:
            root_topics.append(topic)
            stack = [topic]
        else:
            # 保持 stack 长度与当前深度匹配
            stack = stack[:depth]
            if stack:
                stack[-1]["children"]["attached"].append(topic)
                stack.append(topic)
            else:
                root_topics.append(topic)
                stack = [topic]
    
    return root_topics


def build_content(topics: list[dict], title: str = "Mind Map") -> list[dict]:
    """构建 XMind 文件的 JSON 结构。"""
    if not topics:
        topics = [{"id": new_id(), "title": "Main Topic", "children": {"attached": []}}]
    
    # 多根节点时用 title 包裹
    root = topics[0] if len(topics) == 1 else {
        "id": new_id(), "title": title, "children": {"attached": topics}
    }
    if len(topics) == 1 and title != "Mind Map":
        root["title"] = title
    
    return [{"id": new_id(), "title": title, "rootTopic": root, "theme": "robust"}]


def write_xmind(content: list[dict], output_path: str) -> None:
    """将内容写入 XMind（ZIP格式）。"""
    manifest = {"file-entries": {"content.json": {}, "metadata.json": {}}}
    metadata = {
        "creator": {"name": "md2xmind", "version": "1.0.0"},
        "created-time": "2025-01-10T00:00:00Z",
        "last-modified-time": "2025-01-10T00:00:00Z"
    }
    
    with zipfile.ZipFile(output_path, 'w', zipfile.ZIP_DEFLATED) as zf:
        zf.writestr('content.json', json.dumps(content, indent=2, ensure_ascii=False))
        zf.writestr('manifest.json', json.dumps(manifest, indent=2))
        zf.writestr('metadata.json', json.dumps(metadata, indent=2))


def main() -> int:
    ap = argparse.ArgumentParser(description="将 Markdown 树结构转换为 XMind 文件")
    ap.add_argument("input", help="输入的 Markdown 文件路径")
    ap.add_argument("output", help="输出的 XMind 文件路径")
    ap.add_argument("--title", default="Mind Map", help="思维导图标题（默认: Mind Map）")
    args = ap.parse_args()
    
    try:
        markdown = open(args.input, 'r', encoding='utf-8').read()
    except Exception as e:
        error(f"读取输入文件失败: {e}")
        return 1
    
    try:
        topics = build_tree(markdown)
        if not topics:
            error("未找到有效的 Markdown 列表项（格式: - 主题）")
            return 1
        
        write_xmind(build_content(topics, args.title), args.output)
        print(f"已生成 XMind 文件: {args.output}")
        return 0
    except Exception as e:
        error(f"生成 XMind 文件失败: {e}")
        return 2


if __name__ == "__main__":
    raise SystemExit(main())