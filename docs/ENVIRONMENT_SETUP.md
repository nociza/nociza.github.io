# Environment Variables Setup for GitHub Pages

## Overview

Your website now works with GitHub Pages using a **build-time data fetching** approach. Since GitHub Pages only serves static files, we fetch data from Notion during the build process and embed it as static JSON files.

## How It Works

```
Build Time:
Notion API → Fetch Script → Static JSON Files → Next.js Build → GitHub Pages

Runtime:
Static JSON Files → React Components → User Interface
```

## Environment Variables Configuration

### 1. GitHub Repository Secrets

**Required for automatic deployment:**

1. Go to your GitHub repository
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Click **"New repository secret"** and add:

```
NOTION_TOKEN=your_notion_integration_token_here
NOTION_COFFEE_DATABASE_ID=your_coffee_database_id_here
NOTION_PAPERS_DATABASE_ID=your_papers_database_id_here
```

### 2. Local Development Environment

**For local development and testing:**

Create `.env.local` in your project root:

```bash
# Notion Integration
NOTION_TOKEN=your_notion_integration_token_here
NOTION_COFFEE_DATABASE_ID=your_coffee_database_id_here
NOTION_PAPERS_DATABASE_ID=your_papers_database_id_here
```

## Build Process

### Automatic GitHub Pages Deployment

When you push to the `main` branch:

1. **GitHub Actions triggers** the deployment workflow
2. **Environment variables** are loaded from repository secrets
3. **Data fetching script** runs: `npm run fetch-data`
   - Connects to Notion APIs using environment variables
   - Fetches coffee and papers data
   - Generates static JSON files in `public/data/`
4. **Next.js build** runs: `npm run build:static`
   - Builds the static site with embedded data
   - Creates optimized files in `out/` directory
5. **GitHub Pages deployment** serves the static files

### Local Development

```bash
# Fetch latest data from Notion
npm run fetch-data

# Build the site locally
npm run build

# Or do both in one command
npm run build
```

## Data Flow Architecture

### Build Time (Server-side)
```javascript
// scripts/fetch-notion-data.js
const notion = new Client({ auth: process.env.NOTION_TOKEN });
const response = await notion.databases.query({
  database_id: process.env.NOTION_COFFEE_DATABASE_ID
});
// Saves to public/data/coffee.json
```

### Runtime (Client-side)
```javascript
// src/hooks/use-coffee-data.ts
const response = await fetch('/data/coffee.json');
const data = await response.json();
// No environment variables needed at runtime
```

## Generated Static Files

The build process creates these files:

- `out/data/coffee.json` - All coffee entries
- `out/data/coffee-current.json` - Currently drinking coffee
- `out/data/papers.json` - All papers with arXiv metadata

## Notion Database Setup

### Coffee Database Properties
- **Name** (Title) - Coffee name
- **Roaster** (Rich Text) - Coffee roaster
- **Purchase Date** (Date) - When purchased
- **Status** (Select) - Currently Brewing, Currently Drinking, completed
- **Rating** (Number) - Rating out of 10
- **Origin** (Rich Text) - Coffee origin
- **Process** (Rich Text) - Processing method
- **Notes** (Rich Text) - Tasting notes

### Papers Database Properties
- **URL** (URL) - arXiv paper links
- **Status** (Select) - reading, completed, bookmarked
- **Date Added** (Date) - When added
- **Title** (Title) - Auto-filled from arXiv

## Testing Your Setup

### 1. Test Notion Connection
```bash
# Test coffee database
node check-notion.js

# Test papers database
node check-papers-notion.js
```

### 2. Test Data Fetching
```bash
# Fetch data locally
npm run fetch-data

# Check generated files
ls -la public/data/
cat public/data/coffee-current.json
```

### 3. Test Full Build
```bash
# Complete build process
npm run build

# Check output
ls -la out/data/
```

## Deployment Commands

### Manual Deployment
```bash
# Build and deploy manually
npm run export
npm run deploy
```

### Automatic Deployment
```bash
# Just push to main branch
git add .
git commit -m "Update content"
git push origin main
```

## Troubleshooting

### Environment Variables Not Working
- ✅ Check repository secrets are set correctly
- ✅ Verify secret names match exactly
- ✅ Ensure Notion integration has database access

### Build Failures
- ✅ Check GitHub Actions logs for specific errors
- ✅ Test data fetching locally first
- ✅ Verify Notion database structure matches expected format

### Missing Data
- ✅ Check if databases are shared with Notion integration
- ✅ Verify database IDs are correct
- ✅ Test with diagnostic scripts

## Benefits of This Approach

### ✅ GitHub Pages Compatible
- No server-side code required
- Works with free GitHub Pages hosting
- Fast static file serving

### ✅ Notion Integration
- Real-time data sync during builds
- Rich database features in Notion
- Automatic metadata enrichment (arXiv papers)

### ✅ Performance
- No API calls at runtime
- Pre-rendered content for SEO
- Cached static files

### ✅ Reliability
- Fallback data if Notion is unavailable
- No runtime dependencies
- Works offline after initial load

## Updating Content

1. **Add entries** to your Notion databases
2. **Push any changes** to trigger rebuild
3. **Site automatically updates** with latest data

The GitHub Actions workflow will fetch your latest Notion data and rebuild the site automatically! 