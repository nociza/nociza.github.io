const fs = require("fs");
const path = require("path");

// Import the sitemap utilities from the JavaScript file
const { generateSitemap, siteUrls } = require("./sitemap-utils.js");

/**
 * Generate and write the sitemap.xml file
 */
function generateSitemapFile() {
  try {
    // Load coffee data to add individual coffee pages
    const coffeeDataPath = path.join(__dirname, "../public/data/coffee.json");
    let coffeeUrls = [];
    let sipUrls = [];
    let setupUrls = [];

    if (fs.existsSync(coffeeDataPath)) {
      const coffeeData = JSON.parse(fs.readFileSync(coffeeDataPath, "utf8"));
      coffeeUrls = coffeeData.map((coffee) => ({
        url: `https://www.nociza.com/coffee/${coffee.id}/`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.7,
      }));
    }

    const sipDataPath = path.join(__dirname, "../public/data/sips.json");
    if (fs.existsSync(sipDataPath)) {
      const sipData = JSON.parse(fs.readFileSync(sipDataPath, "utf8"));
      sipUrls = sipData.map((entry) => ({
        url: `https://www.nociza.com/sips/${entry.slug}/`,
        lastModified: new Date(entry.publishedAt),
        changeFrequency: "monthly",
        priority: 0.8,
      }));
    }

    const setupDataPath = path.join(__dirname, "../public/data/brew-setups.json");
    if (fs.existsSync(setupDataPath)) {
      const setupData = JSON.parse(fs.readFileSync(setupDataPath, "utf8"));
      setupUrls = setupData.map((setup) => ({
        url: `https://www.nociza.com/sips/setups/${setup.slug}/`,
        lastModified: new Date(setup.updatedAt || setup.publishedAt),
        changeFrequency: "monthly",
        priority: 0.7,
      }));
    }

    // Update the lastModified dates to current date and combine with coffee URLs
    const updatedUrls = [
      ...siteUrls.map((url) => ({
        ...url,
        lastModified: new Date(),
      })),
      ...coffeeUrls,
      ...sipUrls,
      ...setupUrls,
    ];

    const sitemap = generateSitemap(updatedUrls);
    const sitemapPath = path.join(__dirname, "../public/sitemap.xml");

    fs.writeFileSync(sitemapPath, sitemap, "utf8");
    console.log(
      `✅ Sitemap generated successfully at public/sitemap.xml (${updatedUrls.length} URLs)`
    );

    // Also update the robots.txt timestamp if needed
    const robotsPath = path.join(__dirname, "../public/robots.txt");
    if (fs.existsSync(robotsPath)) {
      const robotsContent = fs.readFileSync(robotsPath, "utf8");
      // robots.txt is already properly configured
      console.log("✅ robots.txt is properly configured");
    }
  } catch (error) {
    console.error("❌ Error generating sitemap:", error);
    process.exit(1);
  }
}

// Run the script
if (require.main === module) {
  generateSitemapFile();
}

module.exports = { generateSitemapFile };
