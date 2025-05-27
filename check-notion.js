#!/usr/bin/env node

require("dotenv").config({ path: ".env.local" });

const { Client } = require("@notionhq/client");

async function checkNotionSetup() {
  console.log("🔍 Notion Integration Diagnostic\n");

  // Check environment variables
  const token = process.env.NOTION_TOKEN;
  const databaseId = process.env.NOTION_COFFEE_DATABASE_ID;

  console.log("📋 Environment Variables:");
  console.log(`   NOTION_TOKEN: ${token ? "✅ Set" : "❌ Missing"}`);
  console.log(
    `   NOTION_COFFEE_DATABASE_ID: ${databaseId ? "✅ Set" : "❌ Missing"}`
  );

  if (!token) {
    console.log(
      "\n❌ NOTION_TOKEN is missing. Please run: node setup-notion.js"
    );
    return;
  }

  if (!databaseId) {
    console.log(
      "\n❌ NOTION_COFFEE_DATABASE_ID is missing. Please run: node setup-notion.js"
    );
    return;
  }

  // Test Notion connection
  console.log("\n🔗 Testing Notion Connection...");

  const notion = new Client({ auth: token });

  try {
    // Test database access directly (skip users check as it requires different permissions)
    console.log("\n📊 Testing Database Access...");
    const response = await notion.databases.query({
      database_id: databaseId,
      page_size: 1,
    });

    console.log("   ✅ Database access successful");
    console.log(
      `   📝 Found ${
        response.results.length > 0 ? "entries" : "no entries"
      } in database`
    );

    if (response.results.length > 0) {
      const firstEntry = response.results[0];
      console.log("\n📋 Database Properties Found:");
      Object.keys(firstEntry.properties).forEach((prop) => {
        const propType = firstEntry.properties[prop].type;
        console.log(`   - ${prop} (${propType})`);

        // Check for Status property specifically
        if (prop.toLowerCase() === "status") {
          if (propType !== "select") {
            console.log(
              `     ⚠️  Status property should be 'select' type, found '${propType}'`
            );
            console.log(
              `     💡 Consider changing Status to a Select property with options: currently_drinking, completed, wishlist`
            );
          }
        }
      });
    } else {
      console.log(
        "\n📋 Database is empty - add some coffee entries to test property types"
      );
    }

    console.log("\n🎉 Notion integration is working correctly!");
  } catch (error) {
    console.log(`   ❌ Error: ${error.message}`);

    if (error.code === "object_not_found") {
      console.log(
        "\n🔧 Fix: Your database is not shared with the integration."
      );
      console.log("   1. Open your database in Notion");
      console.log('   2. Click the "..." menu in the top right');
      console.log('   3. Click "Add connections"');
      console.log("   4. Select your integration");
      console.log('   5. Click "Confirm"');
    } else if (error.code === "unauthorized") {
      console.log("\n🔧 Fix: Invalid Notion token.");
      console.log("   1. Check your integration token in Notion");
      console.log("   2. Update NOTION_TOKEN in .env.local");
    } else if (error.code === "validation_error") {
      console.log("\n🔧 Fix: Database property type mismatch.");
      console.log(
        "   This usually means your Status property is not a 'Select' type."
      );
      console.log("   The app will still work, but consider:");
      console.log("   1. Change Status property to Select type");
      console.log("   2. Add options: currently_drinking, completed, wishlist");
    } else {
      console.log("\n🔧 Check the troubleshooting guide in NOTION_SETUP.md");
    }
  }
}

checkNotionSetup().catch(console.error);
