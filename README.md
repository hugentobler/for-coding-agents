# For Coding Agents

A workspace for coding agents to access high-quality documentation by searching cloned source repositories of libraries and frameworks.

When an agent needs to answer questions about a library/framework (e.g., Svelte, SvelteKit, OpenCode), it can search the actual source code for accurate, context-rich answers instead of relying on general knowledge.

## Setup

### Prerequisites

- [OpenCode](https://opencode.ai) installed and configured

### Installation

1. **Configure OpenCode**: Symlink the custom OpenCode agent configs to your OpenCode directory

   ```bash
   mkdir -p ~/.config/opencode/agent
   ln -sf $(pwd)/opencode/agent/research-codebase.md ~/.config/opencode/agent/research-codebase.md
   ```

2. **Clone source repositories**: Add framework/library repos you want to reference

   ```bash
   cd resources/
   
   # Clone repos you want to reference (examples):
   git clone https://github.com/sveltejs/svelte.git
   git clone https://github.com/sveltejs/kit.git
   git clone https://github.com/sveltejs/svelte.dev.git
   git clone https://github.com/sst/opencode.git
   ```

## Usage

Once setup is complete, OpenCode agents can search through the cloned repositories in `resources/` to provide accurate answers based on the actual source code.

### For Agents

When answering questions about supported frameworks/libraries:
1. Use the Task tool to search relevant repositories in `resources/`
2. Read source code directly for implementation details
3. Reference specific file paths and line numbers in responses

Example: "The component lifecycle is handled in resources/svelte/src/runtime/internal/Component.js:45"
