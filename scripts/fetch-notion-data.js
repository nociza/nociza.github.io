#!/usr/bin/env node

require("dotenv").config({ path: ".env.local" });

const fs = require("fs");
const path = require("path");
const { Client } = require("@notionhq/client");

// Initialize Notion client
const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

async function fetchArxivMetadata(arxivId) {
  try {
    // Extract just the ID part (remove version if present)
    const cleanId = arxivId.replace(/v\d+$/, "");

    // Fetch from arXiv API
    const response = await fetch(
      `http://export.arxiv.org/api/query?id_list=${cleanId}`
    );
    const xmlText = await response.text();

    // Parse XML (basic parsing)
    const titleMatch = xmlText.match(/<title>(.*?)<\/title>/s);
    const summaryMatch = xmlText.match(/<summary>(.*?)<\/summary>/s);
    const authorsMatch = xmlText.match(/<name>(.*?)<\/name>/g);
    const publishedMatch = xmlText.match(/<published>(.*?)<\/published>/);
    const categoriesMatch = xmlText.match(/<category term="(.*?)".*?\/>/g);

    if (!titleMatch || !summaryMatch) {
      console.warn(`Could not fetch metadata for arXiv:${arxivId}`);
      return null;
    }

    const authors = authorsMatch
      ? authorsMatch
          .map((match) => match.match(/<name>(.*?)<\/name>/)?.[1] || "")
          .filter(Boolean)
      : [];

    const categories = categoriesMatch
      ? categoriesMatch
          .map((match) => match.match(/term="(.*?)"/)?.[1] || "")
          .filter(Boolean)
      : [];

    return {
      title: titleMatch[1]
        .trim()
        .replace(/^\s*arXiv:\d+\.\d+(v\d+)?\s*\[.*?\]\s*/, ""),
      abstract: summaryMatch[1].trim().replace(/\s+/g, " "),
      authors,
      publishedDate: publishedMatch?.[1] || "",
      categories: categories.slice(0, 3), // Limit to first 3 categories
    };
  } catch (error) {
    console.error(`Error fetching arXiv metadata for ${arxivId}:`, error);
    return null;
  }
}

function getPropertyValue(property) {
  if (!property) return null;

  switch (property.type) {
    case "title":
      return property.title?.[0]?.text?.content || "";
    case "rich_text":
      return property.rich_text?.[0]?.text?.content || "";
    case "url":
      return property.url || "";
    case "date":
      return property.date?.start || "";
    case "last_edited_time":
      return property.last_edited_time || "";
    case "number":
      return property.number;
    case "select":
      return property.select?.name || "";
    case "status":
      return property.status?.name || "";
    case "multi_select":
      return property.multi_select?.map((item) => item.name) || [];
    default:
      return null;
  }
}

async function fetchCoffeeData() {
  const databaseId = process.env.NOTION_COFFEE_DATABASE_ID;

  if (!databaseId || databaseId === "your_coffee_database_id_here") {
    console.log("Coffee database not configured, skipping...");
    return [];
  }

  try {
    const response = await notion.databases.query({
      database_id: databaseId,
      sorts: [
        {
          property: "Purchase Date",
          direction: "descending",
        },
      ],
    });

    const entries = response.results.map((page) => ({
      id: page.id,
      name: getPropertyValue(page.properties.Name) || "",
      roaster: getPropertyValue(page.properties.Roaster) || "",
      date:
        getPropertyValue(page.properties["Purchase Date"]) ||
        getPropertyValue(page.properties.Date) ||
        "",
      notes: getPropertyValue(page.properties.Notes) || "No notes available",
      rating: getPropertyValue(page.properties.Rating),
      origin: getPropertyValue(page.properties.Origin),
      process: getPropertyValue(page.properties.Process),
      status: getPropertyValue(page.properties.Status) || "completed",
    }));

    console.log(`✅ Fetched ${entries.length} coffee entries`);
    return entries;
  } catch (error) {
    console.error("Error fetching coffee data:", error);
    return [];
  }
}

async function fetchPapersData() {
  const databaseId = process.env.NOTION_PAPERS_DATABASE_ID;

  if (!databaseId || databaseId === "your_papers_database_id_here") {
    console.log("Papers database not configured, skipping...");
    return [];
  }

  try {
    const response = await notion.databases.query({
      database_id: databaseId,
      sorts: [
        {
          property: "Date Added",
          direction: "descending",
        },
      ],
    });

    const entries = await Promise.all(
      response.results.map(async (page) => {
        const url =
          getPropertyValue(page.properties.URL) ||
          getPropertyValue(page.properties.Link) ||
          "";

        // Extract arXiv ID from URL
        const arxivMatch = url.match(/arxiv\.org\/abs\/(\d+\.\d+(?:v\d+)?)/);
        const arxivId = arxivMatch ? arxivMatch[1] : "";

        // Fetch metadata from arXiv API
        const metadata = arxivId ? await fetchArxivMetadata(arxivId) : null;

        return {
          id: page.id,
          arxivId,
          url,
          title:
            metadata?.title ||
            getPropertyValue(page.properties.Title) ||
            `arXiv:${arxivId}`,
          authors: metadata?.authors || [],
          abstract: metadata?.abstract || "Abstract not available",
          publishedDate:
            metadata?.publishedDate ||
            getPropertyValue(page.properties["Date Added"]) ||
            "",
          categories: metadata?.categories || [],
          status: getPropertyValue(page.properties.Status) || "bookmarked",
        };
      })
    );

    const validEntries = entries.filter((entry) => entry.arxivId);
    console.log(`✅ Fetched ${validEntries.length} paper entries`);
    return validEntries;
  } catch (error) {
    console.error("Error fetching papers data:", error);
    return [];
  }
}

async function main() {
  console.log("🔄 Fetching Notion data for static build...\n");

  // Create public/data directory if it doesn't exist
  const dataDir = path.join(process.cwd(), "public", "data");
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  // Fetch coffee data
  console.log("☕ Fetching coffee data...");
  const coffeeData = await fetchCoffeeData();

  // Filter currently drinking coffee
  const currentlyDrinking = coffeeData.filter(
    (entry) =>
      entry.status === "currently_drinking" ||
      entry.status === "Currently Drinking" ||
      entry.status === "Currently Brewing" ||
      entry.status?.toLowerCase().includes("current")
  );

  // Write coffee data
  fs.writeFileSync(
    path.join(dataDir, "coffee.json"),
    JSON.stringify(coffeeData, null, 2)
  );
  fs.writeFileSync(
    path.join(dataDir, "coffee-current.json"),
    JSON.stringify(currentlyDrinking, null, 2)
  );

  // Fetch papers data
  console.log("📄 Fetching papers data...");
  const papersData = await fetchPapersData();

  // Write papers data
  fs.writeFileSync(
    path.join(dataDir, "papers.json"),
    JSON.stringify(papersData, null, 2)
  );

  console.log("\n✅ Data fetching complete!");
  console.log(
    `   Coffee entries: ${coffeeData.length} (${currentlyDrinking.length} currently drinking)`
  );
  console.log(`   Paper entries: ${papersData.length}`);
  console.log(`   Files written to: ${dataDir}`);
}

main().catch(console.error);
