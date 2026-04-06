# Schemas

## evals/evals.json

```json
{
  "skill_name": "string",
  "evals": [
    {
      "id": 1,
      "prompt": "string",
      "expected_output": "string",
      "files": []
    }
  ]
}
```

## eval_metadata.json

```json
{
  "eval_id": 0,
  "eval_name": "descriptive-name",
  "prompt": "string",
  "assertions": [
    {
      "name": "string",
      "rule": "what to verify"
    }
  ]
}
```

## grading.json

Viewer-compatible expectations must use these keys:
- `text`
- `passed`
- `evidence`

```json
{
  "run_id": "eval-0-with_skill",
  "expectations": [
    {
      "text": "Includes valid SKILL.md frontmatter",
      "passed": true,
      "evidence": "frontmatter has name and description"
    }
  ]
}
```

## timing.json

```json
{
  "total_tokens": 12345,
  "duration_ms": 23456,
  "total_duration_seconds": 23.4
}
```
