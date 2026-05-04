# How to Write an Awesome SOUL.md

## What is SOUL.md?

SOUL.md is the **personality contract** and **operational manual** for an AI agent in the OpenClaw/Synapse ecosystem. 

It transforms a generic LLM into a named, opinionated, domain-specialized teammate with clear boundaries, responsibilities, and output standards. 

The `good-soul/openclaw/SOUL.md` is the **foundational template** — it defines the philosophical core (Core Truths, Boundaries, Vibe, Continuity). All great specialized SOULs build on this by making it concrete, actionable, and domain-deep.

A mediocre SOUL.md produces a helpful chatbot.  
An awesome SOUL.md produces a reliable specialist who feels like a real team member.

## Core Principles (Synthesized from Template + Excellent Examples)

From the template:
- Be **genuinely helpful**, not performatively (no "Great question!" fluff).
- **Have opinions** and personality — disagree, prefer, find things amusing.
- Be **resourceful first** — read files, check context, try before asking.
- **Earn trust through competence** and respect (you're a guest in someone's life/workspace).
- **Private stays private**. Ask before external actions.

From the best implementations (Sentry, Tidy, Beacon, Forge, Self-Healing Server, etc.):
- **Specificity beats generality** every time.
- Strict rules + concrete examples = trustworthy behavior.
- Proactive + structured reporting builds long-term value.
- Before/after, metrics, reasoning, and options show real expertise.

## Anatomy of a Great SOUL.md

### 1. Strong Identity Header (Mandatory)
```markdown
# [Cool Name] - The [Role]

You are [Name], an AI [specialty] agent powered by OpenClaw.

## Core Identity
- **Role:** ...
- **Personality:** ...
- **Communication:** ...
```

**Why it works**: Naming the agent (Sentry, Tidy, Beacon, Forge) gives it soul. Personality and communication style set the vibe immediately.

### 2. Rules Section (Most Important)
Numbered list of **hard constraints**.

**Good examples**:
- Never fabricate experience or data.
- Always create backup before destructive operations.
- Never close issues without explanatory comment.
- Titles must be under 60 characters.
- Stop auto-remediating after 3 failed attempts and escalate.

**Anti-pattern**: Vague "Be helpful and ethical."

**Power move**: Mix "NEVER", "Always", "Must", with domain-specific edge cases (PTO, first-time contributors, ATS compatibility, etc.).

### 3. Responsibilities (The Job Description)
Break down what the agent actually *does* day-to-day, with sub-bullets explaining *how*.

Examples from studied files:
- Auto-labeling + priority matrix + duplicate detection + team routing (Sentry)
- Auto-tagging + database conversion + weekly cleanup + health scoring (Tidy)
- Title optimization + description + tags + competitor analysis + transcript repurposing (Beacon)
- ATS scoring + keyword optimization + content enhancement + cover letter generation (Forge)
- Health monitoring + auto-remediation + incident logging + disk cleanup (Self-Healing Server)

This section turns the agent from "can help with X" into "owns the entire X workflow."

### 4. Tools & Integrations
- **Tools**: Internal capabilities (API clients, analyzers, simulators, parsers).
- **Integrations**: External systems (GitHub, Notion, Slack, YouTube, LinkedIn, PagerDuty, etc.).

This grounds the agent in real workflows and shows what it can actually touch.

### 5. Output Formats (Highly Recommended)
Provide **exact templates** in code blocks for common response types.

Examples:
- Triage comment template
- Weekly report template
- ATS score report + before/after bullets
- Video SEO report with title options, description, tags, thumbnail concept
- Incident remediation log with before/after metrics

**Why this matters**: Consistency + professionalism + parseability. Users learn to expect and trust the format.

### 6. Example Interactions (Where the Soul Lives)
2–4 concrete dialogues showing:
- How the agent opens
- How it handles real requests
- Tone, structure, and decision-making in action
- Proactive suggestions or questions

This is the single best way to transmit "vibe" that rules alone cannot convey.

### 7. Optional Power Sections
- **Tone / Vibe**: "Calm and factual, like an SRE incident report."
- **Configuration**: Thresholds, schedules, monitored services (YAML blocks work great).
- **Skills**: Specific technical capabilities.
- **Metrics / Health Scores**: What the agent tracks and reports on.

## Best Practices (Learned from the Best Files)

**Do**:
- Use **numbers, thresholds, time limits, character counts** everywhere possible.
- Show **before/after** and **quantified impact** in examples.
- Provide **3 options** with reasoning/scores when appropriate (titles, CTAs, approaches).
- Make the agent **proactive** (weekly reports, suggestions, health scores, cleanup proposals).
- Respect **reversibility** and **human confirmation** for destructive actions.
- Include **domain expertise** (ATS rules, SEO best practices, SRE thresholds, GitHub triage logic).
- Keep examples realistic and multi-turn where useful.

**Don't**:
- Write generic "be a good assistant" rules.
- Make responsibilities high-level ("help users with their work").
- Skip output format examples.
- Forget edge cases (duplicates, first-time users, low data, permission issues).
- Make it too long without clear sections (readability matters).

## Comparison of Styles Observed

- **Long & Deep** (160-190 lines): github-issue-triager, notion-organizer, youtube-seo, resume-optimizer, self-healing-server → Best for complex, ongoing agents. Rich templates and logic.
- **Concise & Punchy** (30-50 lines): Some creative ones → Good for narrow, high-frequency tasks.
- **Template Style**: Philosophical + values-first → Use as starting point, then specialize.

The winners all have **strong identity + strict rules + concrete output formats + realistic examples**.

## Step-by-Step Creation Process

1. Copy the openclaw template as base.
2. Choose a memorable name + one-sentence mission.
3. Write 8–12 strict rules (focus on safety, quality, and anti-patterns first).
4. Detail 4–6 core responsibilities with execution steps.
5. Design 2–3 output format templates.
6. Write 3 example interactions that feel like the agent "in the wild."
7. Add tools/integrations and any config.
8. Review against the Core Truths: Does this feel like someone I'd actually want on my team?
9. Test mentally: "What if the user asks for something borderline?" — rules should guide.
10. Iterate after real usage (update the SOUL.md and tell the user when you change it).

## Final Thought

Writing a great SOUL.md is **character design + standard operating procedures + prompt engineering** combined.

The best ones don't just describe what the agent *can* do — they define exactly **how** it thinks, decides, communicates, and protects the user.

When done right, the agent stops feeling like "AI" and starts feeling like **Sentry**, **Tidy**, **Beacon**, or **Forge** — a real specialist who has your back.

This is the difference between a tool and a teammate.

---

*Studied files (in addition to the mandatory template):*
- `good-soul/development/github-issue-triager/SOUL.md` (Sentry)
- `good-soul/productivity/notion-organizer/SOUL.md` (Tidy)
- `good-soul/marketing/youtube-seo/SOUL.md` (Beacon)
- `good-soul/hr/resume-optimizer/SOUL.md` (Forge)
- `good-soul/devops/self-healing-server/SOUL.md` (Self-Healing Server)
- `good-soul/creative/copywriter/SOUL.md` (for contrast)

*Date of study: 2026-05-04*
