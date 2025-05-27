# GitHub Pages Setup with Notion Integration

This guide explains how to set up your website for GitHub Pages deployment with Notion database integration.

## Overview

Since GitHub Pages only serves static files, we use a build-time approach:
1. **Build Time**: Fetch data from Notion APIs and generate static JSON files
2. **Runtime**: Load data from static JSON files (no server-side API calls)
3. **Deployment**: GitHub Actions handles the build and deployment process

## Environment Variables Setup

### 1. GitHub Repository Secrets

Go to your GitHub repository → Settings → Secrets and variables → Actions → Repository secrets

Add the following secrets:

```
NOTION_TOKEN=your_notion_integration_token_here
NOTION_COFFEE_DATABASE_ID=your_coffee_database_id_here
NOTION_PAPERS_DATABASE_ID=your_papers_database_id_here
```

### 2. Local Development

Create a `.env.local` file in your project root:

```bash
# Notion Integration
NOTION_TOKEN=your_notion_integration_token_here
NOTION_COFFEE_DATABASE_ID=your_coffee_database_id_here
NOTION_PAPERS_DATABASE_ID=your_papers_database_id_here
```

## Notion Setup

### Coffee Database Structure
Your Notion coffee database should have these properties:
- **Name** (Title) - Coffee name
- **Roaster** (Text) - Coffee roaster
- **Purchase Date** (Date) - When you bought it
- **Status** (Select) - Options: Currently Brewing, Currently Drinking, completed
- **Rating** (Number) - Rating out of 10
- **Origin** (Text) - Coffee origin
- **Process** (Text) - Processing method
- **Notes** (Text) - Tasting notes

### Papers Database Structure
Your Notion papers database should have these properties:
- **URL** (URL) - arXiv paper links (e.g., https://arxiv.org/abs/1706.03762)
- **Status** (Select) - Options: reading, completed, bookmarked
- **Date Added** (Date) - When the paper was added
- **Title** (Title) - Optional, auto-filled from arXiv

## Build Process

### Local Build
```bash
# Fetch data from Notion and build
npm run build

# Or fetch data separately
npm run fetch-data
npm run build:static
```

### GitHub Actions Build
The workflow automatically:
1. Fetches data from Notion using your repository secrets
2. Generates static JSON files in `public/data/`
3. Builds the Next.js static site
4. Deploys to GitHub Pages

## Data Flow

```
Notion Database → Build Script → Static JSON → Website Components
```

### Generated Files
- `public/data/coffee.json` - All coffee entries
- `public/data/coffee-current.json` - Currently drinking coffee
- `public/data/papers.json` - All papers with arXiv metadata

### Component Data Loading
Components fetch from static files:
```javascript
// Instead of /api/coffee
fetch('/data/coffee.json')

// Instead of /api/papers  
fetch('/data/papers.json')
```

## Deployment

### Automatic Deployment
Push to main branch triggers automatic deployment:
```bash
git add .
git commit -m "Update content"
git push origin main
```

### Manual Deployment
Trigger deployment manually from GitHub Actions tab.

## Troubleshooting

### Missing Environment Variables
If secrets are not set, the build will use fallback data and show warnings.

### Notion API Errors
- Check that your integration has access to the databases
- Verify database IDs are correct
- Ensure database properties match expected structure

### Build Failures
Check GitHub Actions logs for specific error messages:
1. Go to Actions tab in your repository
2. Click on the failed workflow run
3. Expand the failed step to see error details

## Testing Setup

### Test Notion Integration
```bash
# Test coffee database
node check-notion.js

# Test papers database  
node check-papers-notion.js
```

### Test Data Fetching
```bash
# Fetch data locally
npm run fetch-data

# Check generated files
ls -la public/data/
```

## Features

### Coffee Discovery
- Automatically syncs with your Notion coffee database
- Shows "currently drinking" coffee on main page
- Full archive with search functionality
- Displays tasting notes, ratings, and origin info

### Research Papers
- Tracks arXiv papers from Notion database
- Automatically fetches paper metadata (title, authors, abstract)
- Shows reading status and categories
- Searchable archive with full-text search

### Static Site Benefits
- Fast loading (no API calls at runtime)
- Works with GitHub Pages free hosting
- Reliable (no server dependencies)
- SEO-friendly (all content pre-rendered)

## Updating Content

1. **Add new entries** to your Notion databases
2. **Push any code changes** to trigger rebuild
3. **Manual trigger** from GitHub Actions if needed

The site will automatically rebuild and deploy with your latest Notion data. 