/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: "",
  assetPrefix: "",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  env: {
    // Make environment variables available at build time for static export
    NOTION_TOKEN: process.env.NOTION_TOKEN,
    NOTION_COFFEE_DATABASE_ID: process.env.NOTION_COFFEE_DATABASE_ID,
    NOTION_PAPERS_DATABASE_ID: process.env.NOTION_PAPERS_DATABASE_ID,
  },
};

module.exports = nextConfig;
