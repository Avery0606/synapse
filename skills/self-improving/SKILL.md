---
name: self-improving
description: Use this skill whenever the user says "self-improving", "update AGENTS.md", "self-improvement", "维护 AGENTS.md", or after any non-trivial task that may have introduced new patterns, constraints, workflows, or norms worth recording in the project's survival manual. Also use proactively when you notice AGENTS.md no longer matches actual work practices. Always follow the six-step process and present the update table for confirmation before editing any AGENTS.md.
---

# Self-Improving Skill

This skill enables the AI to autonomously maintain and evolve the project's AGENTS.md files — the "survival manual" that allows future instances to work independently in the current codebase.

## Core Principle

AGENTS.md records the **minimum necessary information** that lets a future AI work independently in this codebase. It is not a changelog, not a personal notebook, and not a place for temporary debugging notes.

## Quick Reference

| Situation                              | Action                                      | Output Required                          |
|----------------------------------------|---------------------------------------------|------------------------------------------|
| User explicitly says “self-improving”, “update AGENTS.md”, etc. | Run full 6-step process                    | Markdown update table + user confirmation |
| Just finished a non-trivial task       | Analyze conversation + diff for new norms   | Table only if reusable pattern found     |
| No new reusable information discovered | Do nothing                                  | Brief “No update needed – reason” note   |
| Before writing any change to AGENTS.md | Present table to user                       | Explicit “同意” or corrections required  |

## When to Use This Skill

- After completing a non-trivial task that introduced new patterns, constraints, or workflows
- When the user explicitly requests "self-improving", "update AGENTS.md", or similar
- When you notice that current AGENTS.md no longer reflects how work is actually done

## Maintenance Principles

Only record information that a stronger AI would still benefit from. Never write redundant information (put it in code comments instead). Never write inaccurate information (leave blank rather than guess). Never write task-specific temporary information. These rules exist because AGENTS.md is a long-term reference, not a scratchpad — noise or guesswork actively harms future instances.

## No-Update Situations

Do not update AGENTS.md if any of the following are true:
- The task was only temporary debugging or exploration
- The change only reflects personal preference
- The change fixes an obvious bug with no new norm
- The detail belongs in code comments
- The information is already present in existing AGENTS.md

These situations are excluded because they either add no reusable value or belong elsewhere in the codebase.

## Chapter Boundaries (Strict)

**Root AGENTS.md** may only update these chapters:
1. 项目简介
2. 关键架构列表
3. 开发约束
4. 项目开发指南

**Subdirectory AGENTS.md** may only update these chapters:
1. 目录简介
2. 开发约束
3. 目录开发指南
4. 注意事项

Never create new chapters.

## Six-Step Judgment Process

**Step 1**: Read all existing AGENTS.md files in the project to understand current state.

**Step 2**: Analyze the current task path. Review the full conversation history and extract:
- Task execution path (what was done first, what tools/methods were used)
- Errors and detours (unnecessary work, violations of existing norms, retries, non-optimal order)
- Whether each item is worth recording (would a stronger AI make the same mistake?)

**Step 3**: Combine current session information with Step 2 analysis. For each AGENTS.md, determine what needs updating and what the update content should be.

**Step 4**: Summarize the required updates into a preliminary list.

**Step 5**: Reflect on the summarized information:
- Can this information be easily obtained by reading code? If so, it should be in code comments, not AGENTS.md.
- Is this information only needed because of current capability limitations? A stronger AI might not need it.
- If it is noise or unnecessary, remove it to avoid regression.

**Step 6**: Output the update list in the following exact Markdown table format:

| AGENTS.md 路径 | 更新章节 | 大致更新内容 |
|---------------|----------|-------------|
| ... | ... | ... |

**Example**:

| AGENTS.md 路径                        | 更新章节     | 大致更新内容                          |
|---------------------------------------|--------------|---------------------------------------|
| `skills/self-improving/SKILL.md`      | 开发约束     | 新增 evals 必须要求                   |
| `opencode-plugin/agents/src/synapse.ts` | 项目开发指南 | 增加 Ares 批量操作的注意事项          |

## Confirmation Requirement

AGENTS.md is the project’s long-term “survival manual.” A single inaccurate or noisy entry can mislead future instances for months. Therefore, **before writing any changes**, you must present the update table and receive explicit user approval (“同意” or corrections). This gate protects the document from temporary debugging notes, personal preferences, and over-documentation of one-off work.

## Output Format

Always end the process by producing the table above. Do not modify any AGENTS.md files until the user approves the plan.
