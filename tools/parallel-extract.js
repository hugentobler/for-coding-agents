#!/usr/bin/env node

/**
 * Parallel AI Extract Tool
 * API Documentation: https://docs.parallel.ai/
 * Requires: PARALLEL_API_KEY environment variable
 */

const args = process.argv.slice(2);

if (args.length === 0 || args[0] === "--help") {
    console.log("Usage: tool-parallel-extract.js <url1> [url2...] [--objective <text>]");
    console.log("\nExtract content from web pages.");
    console.log("\nArguments:");
    console.log("  url1 url2...             One or more URLs to extract (required)");
    console.log("  --objective TEXT         Optional: guide what to extract");
    console.log("                           If omitted: returns full content");
    console.log("                           If provided: returns relevant excerpts only");
    console.log("\nExamples:");
    console.log('  tool-parallel-extract.js "https://example.com"');
    console.log('  tool-parallel-extract.js "https://url1.com" "https://url2.com"');
    console.log('  tool-parallel-extract.js "https://example.com" --objective "extract pricing info"');
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
const urls = [];
let objective = null;

for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    
    if (arg === "--objective") {
        objective = args[++i];
    } else if (!arg.startsWith("--")) {
        urls.push(arg);
    }
}

if (urls.length === 0) {
    console.error("Error: At least one URL is required");
    console.error("Run with --help for usage");
    process.exit(1);
}

// Prepare request
const requestBody = {
    urls: urls,
    excerpts: !!objective,      // true if objective provided
    full_content: !objective,   // true if no objective
};

if (objective) {
    requestBody.objective = objective;
}

try {
    const response = await fetch("https://api.parallel.ai/v1beta/extract", {
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
    
    // Display results
    console.log(`Extract ID: ${data.extract_id}\n`);
    
    if (data.results && data.results.length > 0) {
        console.log(`Successfully extracted ${data.results.length} page(s):\n`);
        console.log("─".repeat(80));
        
        data.results.forEach((result, i) => {
            console.log();
            console.log(`Result ${i + 1}: ${result.title || "Untitled"}`);
            console.log(`URL: ${result.url}`);
            console.log();
            
            if (result.excerpts && result.excerpts.length > 0) {
                console.log("Excerpts:");
                console.log();
                result.excerpts.forEach((excerpt) => {
                    console.log(excerpt);
                    console.log();
                });
            }
            
            if (result.full_content) {
                console.log("Full Content:");
                console.log();
                console.log(result.full_content);
                console.log();
            }
            
            if (i < data.results.length - 1) {
                console.log("─".repeat(80));
            }
        });
    }
    
    // Display errors if any
    if (data.errors && data.errors.length > 0) {
        console.log(`\nErrors (${data.errors.length}):`);
        data.errors.forEach((error, i) => {
            console.log(`${i + 1}. ${error.url}`);
            console.log(`   Error: ${error.error_type} (HTTP ${error.http_status_code})`);
            console.log(`   ${error.content}`);
            console.log();
        });
    }
    
} catch (error) {
    console.error("Error:", error.message);
    process.exit(1);
}
