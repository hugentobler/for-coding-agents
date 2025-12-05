# CLI Tools for Agents

Token-efficient command-line tools for AI agents. All tools are globally accessible once installed.

## Setup

### 1. Install all tools

```bash
./setup.sh
```

Run from project root. This installs **all** tools to `~/.local/bin` and sets up Pi commands.

### 2. Set API key

Edit `.env` in the project root:

```bash
cp .env.example .env
nano .env  # Add your actual API keys
```

Get your API key from: https://parallel.ai  
**API Documentation:** https://docs.parallel.ai/

Then reload your shell or run setup again:

```bash
./setup.sh
```

**Note:** `setup.sh` creates wrapper scripts that inject environment variables, so tools work from any directory without needing to load `.env` themselves.

## How to Invoke Tools

**CRITICAL FOR AGENTS**: These are executable scripts in your PATH with `tool-` prefix. 

**Quote handling:** Always use double quotes around argument values that contain spaces or special characters.

✓ **CORRECT:**
```bash
tool-parallel-search.js --objective "quantum computing applications"
tool-parallel-search.js --search-queries "SvelteKit +SSR","performance optimization"
```

✗ **INCORRECT:**
```bash
tool-parallel-search.js --objective quantum computing  # Missing quotes - breaks on spaces
node tool-parallel-search.js --objective "test"        # Don't use 'node' prefix
./parallel-search.js --objective "test"                # Don't use './' prefix
parallel-search.js --objective "test"                  # Missing 'tool-' prefix
```

---

## Available Tools

### tool-parallel-search.js

Deep web research using Parallel Search API (agentic mode). Returns up to 5 results with URLs, titles, publish dates, and relevant excerpts.

**Usage:**
```bash
tool-parallel-search.js --objective <text>
tool-parallel-search.js --search-queries <q1,q2>
```

**Search Strategies (choose one):**

| Strategy | When to Use | Example |
|----------|-------------|---------|
| **--objective** ⭐ | Most cases: exploratory research, latest info | `--objective "latest AI breakthroughs, prefer research papers"` |
| **--search-queries** | Technical precision, exact matches | `--search-queries "SvelteKit +SSR","svelte benchmark"` |

**Arguments:**
- `--objective TEXT`: Natural language description with guidance (RECOMMENDED - Parallel AI prefers context)
- `--search-queries Q1,Q2`: Comma-separated keyword queries with search operators

**Examples:**
```bash
# Objective with guidance (recommended)
tool-parallel-search.js --objective "compare Python web frameworks, prefer 2024 benchmarks"

# Technical keyword search
tool-parallel-search.js --search-queries "react hooks +performance -class","react 18 concurrent"
```

**For agents:** Use `--objective` by default. It allows you to provide context, preferred sources, and freshness requirements.

---

### tool-parallel-extract.js

Extract content from web pages using Parallel Extract API.

**Usage:**
```bash
tool-parallel-extract.js <url1> [url2...] [--objective <text>]
```

**Behavior:**
- **Without --objective**: Returns full page content
- **With --objective**: Returns only relevant excerpts

**Arguments:**
- `url1 url2...`: One or more URLs (required)
- `--objective TEXT`: Optional guide for what to extract

**Examples:**
```bash
# Extract full content
tool-parallel-extract.js "https://docs.parallel.ai/api"

# Extract from multiple pages
tool-parallel-extract.js "https://url1.com" "https://url2.com"

# Extract specific information
tool-parallel-extract.js "https://example.com/pricing" --objective "extract pricing tiers and features"
```

**For agents:** Use `--objective` when you only need specific information to save tokens.

---

## Troubleshooting

**"PARALLEL_API_KEY environment variable not set"**

Make sure you've created `.env` with your API key:
```bash
cp .env.example .env
nano .env  # Add your key
```

**"command not found: tool-parallel-*"**

Make sure `~/.local/bin` is in your PATH. Add to your shell config:
```bash
export PATH="$HOME/.local/bin:$PATH"
```

Then run the installer:
```bash
./setup.sh
```

## Adding New Tools

To add a new tool:

1. Create `yourname.js` in this directory with `#!/usr/bin/env node` shebang
2. Use `process.env.PARALLEL_API_KEY` or other env vars - no loading code needed!
3. Create corresponding command file in `pi/agent/commands/yourname.md`
4. Run `../setup.sh` from project root to install
5. Document it in this README

The setup script automatically creates wrappers that inject environment variables for ALL tools in the `tools/` directory. No boilerplate needed!
