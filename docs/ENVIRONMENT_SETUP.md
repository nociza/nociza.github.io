# Content publishing setup

The website is a static Next.js export hosted on GitHub Pages. Public content lives in versioned JSON files inside the repository; the build does not fetch from a database or require content-service secrets.

## Public collections

- `public/data/sips.json` — polished tea and coffee entries
- `public/data/reads.json` — books, audiobooks, and papers
- `public/data/coffee.json` — legacy coffee archive
- `public/data/coffee-current.json` — legacy current-coffee view

Siplogue and Readlogue update these files through clean Git checkouts. Each publisher validates its collection, creates a normal commit, and pushes to `main`. The push triggers the GitHub Pages deployment.

## Local build

```bash
npm ci
npm run validate:content
npm run build:static
```

No environment variables are required for content builds. Publisher credentials and private receipts belong on the Teleclaw host, outside this repository.

## Data flow

```text
Telegram message → Teleclaw skill → validated JSON → Git commit → GitHub Pages build
```

The public Git repository is the source of truth for published content. Raw chat messages, source photographs, and operational receipts remain private on the Teleclaw host.
