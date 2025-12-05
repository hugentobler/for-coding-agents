---
description: Research a codebase (usage: /research-codebase <codebase> <question>)
---

Research: **$@**

**Available:** svelte, kit, svelte.dev, opencode

**Invoke sub-agent to search the codebase:**

```bash
pi --print --no-session --tools read,grep,find,ls --thinking off \
  "Search ~/Developer/.for-coding-agents/resources/<codebase>/ for: <question>"
```

**Example:** User asks "research svelte onMount"

```bash
pi --print --no-session --tools read,grep,find,ls --thinking off \
  "Search ~/Developer/.for-coding-agents/resources/svelte/ for onMount. Explain with code examples and file paths."
```
