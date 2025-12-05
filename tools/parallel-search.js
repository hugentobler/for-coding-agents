#!/usr/bin/env node

/**
 * Parallel AI Search Tool
 * API Documentation: https://docs.parallel.ai/
 * Requires: PARALLEL_API_KEY environment variable
 */

const args = process.argv.slice(2);

if (args.length === 0 || args[0] === "--help") {
    console.log("Usage: tool-parallel-search.js --objective <text>");
    console.log("   or: tool-parallel-search.js --search-queries <q1,q2>");
    console.log("\nSearch Strategy (choose one):");
    console.log("  --objective TEXT         Natural language: what to find, guidance on sources/freshness");
    console.log("                           (RECOMMENDED - Parallel AI prefers context)");
    console.log("  --search-queries Q1,Q2   Keyword queries with operators for technical precision");
    console.log("\nExamples:");
    console.log('  tool-parallel-search.js --objective "latest AI breakthroughs in 2024, prefer research papers"');
    console.log('  tool-parallel-search.js --search-queries "SvelteKit +SSR +performance","svelte ssr benchmark"');
    process.exit(0);
}

const apiKey = process.env.PARALLEL_API_KEY;
if (!apiKey) {
    console.error("Error: PARALLEL_API_KEY environment variable not set");
    console.error("Set it in your ~/.zshrc or ~/.bashrc:");
    console.error("  export PARALLEL_API_KEY='your-api-key-here'");
    process.exit(1);
}

// Parse arguments
const options = {
    mode: "agentic",  // Default to agentic (deep research). 'one-shot' available but not exposed.
    max_results: 5,   // Fixed to 5 for token efficiency
};

for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    
    if (arg === "--objective") {
        options.objective = args[++i];
    } else if (arg === "--search-queries") {
        // Split comma-separated queries into array
        options.search_queries = args[++i].split(",").map(q => q.trim());
    }
}

// API requires either 'objective' or 'search_queries'
if (!options.objective && !options.search_queries) {
    console.error("Error: Must provide --objective or --search-queries");
    console.error("Run with --help for usage");
    process.exit(1);
}

// Prepare request
const requestBody = {
    mode: options.mode,
    max_results: options.max_results,
};

if (options.objective) {
    requestBody.objective = options.objective;
} else {
    requestBody.search_queries = options.search_queries;
}

try {
    const response = await fetch("https://api.parallel.ai/v1beta/search", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "x-api-key": apiKey,
            "parallel-beta": "search-extract-2025-10-10",
        },
        body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`API error (${response.status}): ${errorText}`);
    }

    const data = await response.json();
    
    if (!data.results || data.results.length === 0) {
        console.log("No results found");
        process.exit(0);
    }
    
    console.log(`Found ${data.results.length} results (Search ID: ${data.search_id})\n`);
    console.log("─".repeat(80));
    
    data.results.forEach((result, i) => {
        console.log();
        console.log(`Result ${i + 1}: ${result.title || "Untitled"}`);
        console.log(`URL: ${result.url}`);
        if (result.publish_date) {
            console.log(`Published: ${result.publish_date}`);
        }
        console.log();
        
        if (result.excerpts && result.excerpts.length > 0) {
            console.log("Excerpts:");
            console.log();
            result.excerpts.forEach((excerpt) => {
                console.log(excerpt);
                console.log();
            });
        }
        
        if (i < data.results.length - 1) {
            console.log("─".repeat(80));
        }
    });
    
} catch (error) {
    console.error("Error:", error.message);
    process.exit(1);
}
