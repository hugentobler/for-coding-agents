# API References

Quick reference for API documentation URLs used by tools in this directory.

## Parallel AI

- **Website:** https://parallel.ai
- **API Docs:** https://docs.parallel.ai/
- **Get API Key:** https://parallel.ai (account required)
- **Tools using this API:**
  - `parallel-search.js` - Web search with agentic mode (returns 5 results)
  - `parallel-extract.js` - Content extraction from URLs (full content or targeted excerpts)

**Environment Variable:** `PARALLEL_API_KEY`

---

## Adding New APIs

When adding a new API/service:

1. Add its docs URL to this file
2. Add to `.env.example` with comment pointing to docs
3. Add doc comment at top of tool file
4. Update `tools/README.md` with link

This makes it easy for agents to find current API documentation when debugging or enhancing tools.
