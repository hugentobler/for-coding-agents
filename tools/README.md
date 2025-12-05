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

Then reload your shell or run setup again:

```bash
./setup.sh
```

**Note:** `setup.sh` creates wrapper scripts that inject environment variables, so tools work from any directory without needing to load `.env` themselves.

## How to Invoke Tools

**CRITICAL FOR AGENTS**: These are executable scripts in your PATH with `tool-` prefix. When invoking via the Bash tool:

✓ **CORRECT:**
```bash
tool-parallel-search.js "quantum computing"
tool-parallel-extract.js "https://example.com"
```

✗ **INCORRECT:**
```bash
node parallel-search.js           # Don't use 'node' prefix
./parallel-search.js              # Don't use './' prefix
parallel-search.js                # Missing 'tool-' prefix
```

---

## Available Tools

### tool-parallel-search.js

Search the web using Parallel Search API. Returns URLs, titles, publish dates, and relevant excerpts.

**Usage:**
```bash
tool-parallel-search.js "your query"
tool-parallel-search.js "your query" --max 15
tool-parallel-search.js "your query" --mode advanced
tool-parallel-search.js "your query" --objective "find latest research"
```

**Options:**
- `--mode [basic|advanced]`: Search mode (default: basic)
  - `basic`: Fast, general search (maps to API's 'one-shot')
  - `advanced`: Deep research with follow-up queries (maps to API's 'agentic')
- `--objective TEXT`: Search objective/goal for additional context
- `--max N`: Maximum number of results (default: 10)

**Examples:**
```bash
# Quick search
tool-parallel-search.js "quantum computing"

# Deep research with more results
tool-parallel-search.js "AI breakthroughs" --mode advanced --max 20

# Targeted search with objective
tool-parallel-search.js "machine learning frameworks" --objective "compare performance and ease of use"
```

**Token Efficiency Tips:**
- Start with `basic` mode (default) for quick searches
- Use `advanced` mode sparingly for deeper research
- Limit results with `--max` (default 10 is usually sufficient)
- Add `--objective` for more focused results

---

### tool-parallel-extract.js

*Coming soon*

Extract content from web pages using Parallel Extract API.

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
