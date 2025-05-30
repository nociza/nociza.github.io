#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

console.log("🔬 Papers Notion Database Setup\n");

console.log(
  "This script will help you set up Notion integration for tracking arXiv papers.\n"
);

console.log("📋 Required Notion Database Structure:");
console.log("   Your Notion database should have these properties:");
console.log("   - URL (URL type) - for arXiv paper links");
console.log(
  "   - Status (Select type) - with options: reading, completed, bookmarked"
);
console.log("   - Date Added (Date type) - when the paper was added");
console.log(
  "   - Title (Title type) - optional, will be auto-filled from arXiv"
);
console.log("");

console.log("🔧 Setup Steps:");
console.log("   1. Create a new Notion database with the properties above");
console.log(
  "   2. Add some arXiv paper URLs to test (e.g., https://arxiv.org/abs/1706.03762)"
);
console.log("   3. Share the database with your Notion integration");
console.log("   4. Copy the database ID from the URL");
console.log("   5. Add NOTION_PAPERS_DATABASE_ID to your .env.local file");
console.log("");

console.log("📝 Example .env.local entry:");
console.log("   NOTION_PAPERS_DATABASE_ID=your_papers_database_id_here");
console.log("");

console.log("🚀 Features:");
console.log(
  "   - Automatically fetches paper title, authors, and abstract from arXiv API"
);
console.log("   - Displays papers with enhanced metadata on your website");
console.log("   - Supports reading status tracking");
console.log("   - Searchable archive with full-text search");
console.log("");

console.log("🔍 Testing:");
console.log("   After setup, run: node check-papers-notion.js");
console.log("");

console.log("💡 Tips:");
console.log(
  "   - Only arXiv URLs are supported (https://arxiv.org/abs/XXXX.XXXXX)"
);
console.log("   - The system will extract metadata automatically from arXiv");
console.log("   - You can add papers directly through the Notion interface");
console.log("   - Status field helps organize papers by reading progress");
