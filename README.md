# For Coding Agents

A centralized repository providing tools, resources, and configurations for AI coding agents.

**Why hidden?** This folder is intentionally prefixed with `.` to keep it out of regular project listings while remaining accessible via absolute paths.

## What's Inside

### 1. CLI Tools (`tools/`)
Global command-line tools that agents can invoke from anywhere:
- **parallel-search** - Web search using Parallel AI API
- More tools as needed...

Tools are installed to `~/.local/bin` with wrapper scripts that inject environment variables, requiring zero boilerplate in tool code.

### 2. Agent Configs (`pi/`, `opencode/`)
Agent-specific configurations that get mirrored to system locations:
- **Pi commands** (`pi/agent/commands/*.md`) → `~/.pi/agent/commands/`
- **OpenCode configs** (`opencode/agent/*.md`) → `~/.config/opencode/agent/`

These enable agents to discover and use tools through their native interfaces (e.g., `/parallel-search` in Pi).

### 3. Research Resources (`resources/`)
Cloned source repositories for documentation research:
- Svelte, SvelteKit, OpenCode, etc.
- Agents can search actual source code for accurate answers
- `.gitkeep` files preserve folder structure

## Quick Start

### Prerequisites
- Node.js installed
- [Pi](https://github.com/mariozechner/pi-coding-agent) or [OpenCode](https://opencode.ai) (optional)

### Installation

```bash
# 1. Configure API keys
cp .env.example .env
nano .env  # Add your actual API keys

# 2. Run setup (installs everything)
./setup.sh
```

**What setup does:**
- Creates tool wrappers in `~/.local/bin/` with environment variables baked in
- Copies agent configs to `~/.pi/` and `~/.config/opencode/`
- Updates `~/.bashrc` for interactive shell use

**Note:** Re-run `./setup.sh` after editing tools, configs, or `.env` file.

### Optional: Clone Research Repositories

```bash
cd resources/
git clone https://github.com/sveltejs/svelte.git
git clone https://github.com/sveltejs/kit.git
# ... add more as needed
```

## Usage

**For CLI tools:**
```bash
tool-parallel-search.js "quantum computing"
tool-parallel-search.js "AI research" --mode advanced --max 15
```

**For agents (Pi example):**
```
/parallel-search latest AI breakthroughs
```

**For research:**
Agents can search `resources/` repositories for accurate implementation details.

## Adding New Tools

1. Create `tools/yourname.js` with `#!/usr/bin/env node` shebang
2. Use `process.env.YOUR_VAR` for config - no loading code needed
3. Add corresponding `pi/agent/commands/yourname.md` if desired
4. Run `./setup.sh` to install

The setup script automatically creates wrappers for all `.js` files in `tools/`.

## Architecture Notes

**Why wrappers?** Pi's bash tool uses `sh -c` which doesn't load shell profiles. Wrapper scripts inject environment variables at runtime, making tools work from any directory without boilerplate.

**Why copies not symlinks?** Pi doesn't support symlinked command files, so configs are copied during setup.
