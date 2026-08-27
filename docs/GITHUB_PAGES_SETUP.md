# GitHub Pages deployment

Pushes to `main` run `.github/workflows/deploy.yml`, validate committed content, build the static Next.js export, and deploy `out/` to GitHub Pages.

## Content workflow

1. Siplogue or Readlogue fast-forwards its clean website checkout.
2. The skill updates its public JSON collection.
3. The collection validator runs before commit.
4. The skill creates and pushes one normal Git commit.
5. GitHub Actions builds and deploys the site.

There is no scheduled content sync, database fetch, or Notion credential in the deployment workflow.

## Manual verification

```bash
npm ci
npm run validate:content
npm run build:static
```

The generated site is written to `out/`. A deployment can also be triggered manually from the repository's Actions tab.
