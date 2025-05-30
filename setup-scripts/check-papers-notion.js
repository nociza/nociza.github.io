#!/usr/bin/env node

require("dotenv").config({ path: ".env.local" });

const { Client } = require("@notionhq/client");

async function checkPapersNotionSetup() {
  console.log("🔬 Papers Notion Integration Diagnostic\n");

  // Check environment variables
  const token = process.env.NOTION_TOKEN;
  const databaseId = process.env.NOTION_PAPERS_DATABASE_ID;

  console.log("📋 Environment Variables:");
  console.log(`   NOTION_TOKEN: ${token ? "✅ Set" : "❌ Missing"}`);
  console.log(
    `   NOTION_PAPERS_DATABASE_ID: ${databaseId ? "✅ Set" : "❌ Missing"}`
  );

  if (!token) {
    console.log(
      "\n❌ NOTION_TOKEN is missing. Please run: node setup-notion.js"
    );
    return;
  }

  if (!databaseId) {
    console.log(
      "\n❌ NOTION_PAPERS_DATABASE_ID is missing. Please run: node setup-papers-notion.js"
    );
    return;
  }

  // Test Notion connection
  console.log("\n🔗 Testing Notion Connection...");

  const notion = new Client({ auth: token });

  try {
    console.log("\n📊 Testing Papers Database Access...");
    const response = await notion.databases.query({
      database_id: databaseId,
      page_size: 5,
    });

    console.log("   ✅ Papers database access successful");
    console.log(`   📝 Found ${response.results.length} entries in database`);

    if (response.results.length > 0) {
      console.log("\n📋 Database Properties Found:");
      const firstEntry = response.results[0];
      Object.keys(firstEntry.properties).forEach((prop) => {
        const propType = firstEntry.properties[prop].type;
        console.log(`   - ${prop} (${propType})`);
      });

      console.log("\n📄 Sample Papers:");
      response.results.forEach((entry, index) => {
        const url =
          entry.properties.URL?.url || entry.properties.Link?.url || "No URL";
        const status =
          entry.properties.Status?.select?.name ||
          entry.properties.Status?.status?.name ||
          "No status";
        const title =
          entry.properties.Title?.title?.[0]?.text?.content || "No title";

        // Extract arXiv ID from URL
        const arxivMatch = url.match(/arxiv\.org\/abs\/(\d+\.\d+(?:v\d+)?)/);
        const arxivId = arxivMatch ? arxivMatch[1] : "Not arXiv";

        console.log(`   ${index + 1}. ${title || `arXiv:${arxivId}`}`);
        console.log(`      URL: ${url}`);
        console.log(`      Status: ${status}`);
        console.log(`      arXiv ID: ${arxivId}`);
        console.log("");
      });

      // Check for required properties
      const requiredProps = ["URL", "Status", "Date Added"];
      const missingProps = requiredProps.filter(
        (prop) =>
          !Object.keys(firstEntry.properties).some(
            (key) =>
              key.toLowerCase().includes(prop.toLowerCase()) ||
              (prop === "URL" && key.toLowerCase().includes("link"))
          )
      );

      if (missingProps.length > 0) {
        console.log("⚠️  Missing recommended properties:");
        missingProps.forEach((prop) => {
          console.log(`   - ${prop}`);
        });
        console.log(
          "   The integration will still work but some features may be limited."
        );
      }
    } else {
      console.log(
        "\n📋 Database is empty - add some arXiv paper URLs to test the integration"
      );
      console.log("   Example: https://arxiv.org/abs/1706.03762");
    }

    console.log("\n🎉 Papers Notion integration is working correctly!");
    console.log(
      "   Your papers will be displayed with enhanced arXiv metadata."
    );
  } catch (error) {
    console.log(`   ❌ Error: ${error.message}`);

    if (error.code === "object_not_found") {
      console.log(
        "\n🔧 Fix: Your papers database is not shared with the integration."
      );
      console.log("   1. Open your papers database in Notion");
      console.log('   2. Click the "..." menu in the top right');
      console.log('   3. Click "Add connections"');
      console.log("   4. Select your integration");
      console.log('   5. Click "Confirm"');
    } else if (error.code === "unauthorized") {
      console.log("\n🔧 Fix: Invalid Notion token.");
      console.log("   1. Check your integration token in Notion");
      console.log("   2. Update NOTION_TOKEN in .env.local");
    } else {
      console.log("\n🔧 Check the setup guide: node setup-papers-notion.js");
    }
  }
}

checkPapersNotionSetup().catch(console.error);
