#!/usr/bin/env node

const args = process.argv.slice(2);

if (args.length === 0 || args[0] === "--help") {
    console.log("Usage: tool-parallel-search.js <query> [options]");
    console.log("\nOptions:");
    console.log("  --mode [basic|advanced]  Search mode (default: basic)");
    console.log("                           basic: Fast, general search");
    console.log("                           advanced: Deep research with follow-up queries");
    console.log("  --objective TEXT         Search objective/goal for context");
    console.log("  --max N                  Maximum results (default: 10)");
    console.log("\nExamples:");
    console.log('  tool-parallel-search.js "quantum computing"');
    console.log('  tool-parallel-search.js "AI research" --mode advanced --max 15');
    console.log('  tool-parallel-search.js "machine learning" --objective "find latest techniques"');
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
let query = "";
const options = {
    mode: "one-shot",  // API expects 'one-shot' or 'agentic'
    max_results: 10,
};

for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    
    if (arg === "--mode") {
        const mode = args[++i];
        if (mode === "basic" || mode === "one-shot") {
            options.mode = "one-shot";
        } else if (mode === "advanced" || mode === "agentic") {
            options.mode = "agentic";
        } else {
            console.error(`Error: Invalid mode "${mode}". Use "basic" or "advanced"`);
            process.exit(1);
        }
    } else if (arg === "--objective") {
        options.objective = args[++i];
    } else if (arg === "--max") {
        options.max_results = parseInt(args[++i]) || 10;
    } else if (!arg.startsWith("--")) {
        query += (query ? " " : "") + arg;
    }
}

if (!query) {
    console.error("Error: No query provided");
    process.exit(1);
}

// Prepare request - API requires either 'objective' or 'search_queries'
const requestBody = {
    objective: options.objective || query,  // Use objective if provided, otherwise use query as objective
    mode: options.mode,
    max_results: options.max_results,
};

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
    
    // Token-efficient output: only essential info
    console.log(`Found ${data.results.length} results (Search ID: ${data.search_id}):\n`);
    
    data.results.forEach((result, i) => {
        console.log(`${i + 1}. ${result.title || "Untitled"}`);
        console.log(`   URL: ${result.url}`);
        if (result.publish_date) {
            console.log(`   Published: ${result.publish_date}`);
        }
        if (result.excerpts && result.excerpts.length > 0) {
            console.log(`   Excerpts:`);
            result.excerpts.forEach((excerpt, idx) => {
                console.log(`     ${idx + 1}. ${excerpt}`);
            });
        }
        console.log();
    });
    
} catch (error) {
    console.error("Error:", error.message);
    process.exit(1);
}
