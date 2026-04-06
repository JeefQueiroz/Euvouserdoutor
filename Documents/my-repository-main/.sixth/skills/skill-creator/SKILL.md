---
name: skill-creator
description: Create new skills, modify and improve existing skills, and measure skill performance. Use this whenever the user asks to create a skill from scratch, edit or optimize an existing skill, run evals for a skill, benchmark skill quality with variance analysis, or improve a skill description for better triggering accuracy.
---

# Skill Creator

Create and iteratively improve skills with a clear loop: draft -> test -> review -> improve.

## What this skill does

Use this skill to:
- create a new skill from scratch
- improve an existing skill
- design test prompts and eval cases
- run qualitative + quantitative skill evaluation
- benchmark quality, latency, and token cost with variance
- optimize description/frontmatter for better triggering

## Capture intent first

Before writing files, extract context from the current conversation:
- which workflow should be captured
- which tools are required
- expected input/output format
- objective success criteria
- whether test cases are needed

Then confirm assumptions and proceed.

## Skill structure

Always use this structure:

```text
<skill-name>/
  SKILL.md
  agents/
  references/
  assets/
  evals/
```

If the project already has a convention, follow it.

## SKILL.md requirements

Include frontmatter and body:
- `name`: stable identifier (kebab-case)
- `description`: what it does + when to trigger (be explicit and slightly pushy to avoid undertriggering)

Keep body concise, imperative, and reusable.

## Suggested creation workflow

1. Define scope and triggers
2. Draft SKILL.md
3. Add supporting files (agents, references, assets) only if needed
4. Create 2-3 realistic eval prompts in `evals/evals.json`
5. Run with-skill and baseline runs
6. Grade assertions
7. Aggregate benchmark and summarize deltas
8. Review with user, then revise
9. Repeat until stable

## Evals format

Use:

```json
{
  "skill_name": "example-skill",
  "evals": [
    {
      "id": 1,
      "prompt": "User task prompt",
      "expected_output": "Expected result summary",
      "files": []
    }
  ]
}
```

Use objective assertions when possible. For subjective outputs, prefer qualitative human review.

## Benchmarking checklist

For each run, capture:
- pass rate
- duration
- token usage
- variance/stddev

Report:
- with-skill vs baseline delta
- assertions that do not discriminate
- flaky/high-variance cases
- quality vs cost tradeoffs

## Description optimization workflow

After skill quality is good:
1. create trigger eval set (should-trigger + should-not-trigger)
2. validate with user
3. run iterative description optimization
4. apply best description by held-out score

## Communication style

Adjust language to user familiarity:
- default: plain language
- explain technical terms briefly if needed
- avoid jargon overload

## Safety

Do not create deceptive or malicious skills.
Skills must align with user intent and expected behavior.

## Output contract

When asked to create or improve a skill, provide:
1. files created/updated
2. why each change improves triggering or quality
3. test prompts used
4. benchmark summary (if run)
5. next iteration plan
