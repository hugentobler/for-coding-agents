---
description: Extract content from one or more URLs - add objective for targeted excerpts, omit for full content
---

User input: **$@**

Parse input:
1. **URLs** (required) - one or more
2. **Objective text** (optional) - any non-URL text

Execute:
```bash
# URLs only → full content
tool-parallel-extract.js "URL1" ["URL2"...]

# URLs + objective → targeted excerpts (saves tokens)
tool-parallel-extract.js "URL1" ["URL2"...] --objective "objective text"
```

**Display the tool's output as-is.** Do not summarize or reformat the extracted content.
