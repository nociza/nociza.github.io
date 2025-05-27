#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log("🚀 Notion Coffee Tracker Setup\n");
console.log("This script will help you set up your Notion integration.");
console.log(
  "Follow the guide in NOTION_SETUP.md first to create your integration and database.\n"
);

function question(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, resolve);
  });
}

async function setup() {
  try {
    const token = await question("Enter your Notion Integration Token: ");
    const databaseId = await question("Enter your Coffee Database ID: ");

    if (!token || !databaseId) {
      console.log("❌ Both token and database ID are required.");
      process.exit(1);
    }

    const envContent = `# Notion Integration
NOTION_TOKEN=${token}
NOTION_COFFEE_DATABASE_ID=${databaseId}

# Next.js
NEXT_PUBLIC_BASE_URL=http://localhost:3000
`;

    const envPath = path.join(process.cwd(), ".env.local");
    fs.writeFileSync(envPath, envContent);

    console.log("\n✅ Environment variables saved to .env.local");
    console.log("🔄 Restart your development server to apply changes:");
    console.log("   npm run dev\n");
  } catch (error) {
    console.error("❌ Setup failed:", error.message);
  } finally {
    rl.close();
  }
}

setup();
