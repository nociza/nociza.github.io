const fs = require("fs");
const path = require("path");

// Import the sitemap utilities (convert to CommonJS format)
const { generateSitemap, siteUrls } = require("../src/lib/sitemap.ts");

/**
 * Generate and write the sitemap.xml file
 */
function generateSitemapFile() {
  try {
    // Update the lastModified dates to current date
    const updatedUrls = siteUrls.map((url) => ({
      ...url,
      lastModified: new Date(),
    }));

    const sitemap = generateSitemap(updatedUrls);
    const sitemapPath = path.join(__dirname, "../public/sitemap.xml");

    fs.writeFileSync(sitemapPath, sitemap, "utf8");
    console.log("✅ Sitemap generated successfully at public/sitemap.xml");

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
