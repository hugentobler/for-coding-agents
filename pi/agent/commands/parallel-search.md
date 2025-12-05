---
description: Search the web using Parallel AI (query: your search terms)
---

Search the web for: **$@**

**Query should be:** Natural language search terms (e.g., "quantum computing applications", "SvelteKit SSR best practices")

Execute this command:
```bash
tool-parallel-search.js "$@"
```

**Options you can add:**
- `--mode advanced` - Deep research with follow-up queries (uses more tokens)
- `--max N` - Number of results (default: 10)
- `--objective "text"` - Specify search goal for better targeting

**Common usage patterns:**
```bash
# Basic search (default, fast)
tool-parallel-search.js "SvelteKit server-side rendering"

# Deep research
tool-parallel-search.js "AI breakthroughs 2024" --mode advanced

# Targeted search with objective
tool-parallel-search.js "Python frameworks" --objective "compare performance and features"
```

Returns: URLs, titles, publish dates, and relevant excerpts.
