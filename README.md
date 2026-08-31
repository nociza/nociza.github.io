# nociza.com

The personal website of Yueheng “Alex” Zhang, built as a statically exported
Next.js site and hosted on GitHub Pages at [www.nociza.com](https://www.nociza.com/).

The site includes a portfolio, project gallery, reading shelf, music and coffee
archives, and [Siplogue](https://www.nociza.com/sips/): a living tea and coffee
journal with a current rotation and photographed brew setups.

## Stack

- Next.js 14 with the App Router and static export
- React 18 and TypeScript
- Tailwind CSS
- GitHub Pages with a custom domain
- Structured JSON and checked-in media for public journal content

There is no production application server or content database. Git is the
public content history and every route is exported as static HTML.

## Content collections

| Collection | Source | Public media | Validator |
| --- | --- | --- | --- |
| Reading shelf | `public/data/reads.json` | `public/images/reads/` | `npm run validate:reads` |
| Siplogue cups | `public/data/sips.json` | `public/images/sips/` | `npm run validate:sips` |
| Brew setups | `public/data/brew-setups.json` | `public/images/brew-setups/` | `npm run validate:setups` |

Siplogue cup records carry the message receipt time, an optional current window,
and stable brew-setup references. The browser derives whether a current window
has expired, so a coffee naturally moves into the archive after its configured
TTL without a database or cron job. Setup records describe the actual methods,
tools, and machinery available and receive their own static detail pages under
`/sips/setups/{slug}/`.

Public Siplogue entries are published with the open-source
[`sip`](https://github.com/nociza/siplogue) agent skill. Teleclaw keeps rough
captions, original photographs, receipts, message identifiers, and credentials
outside this repository. Only polished structured content and sanitized public
images are committed here.

## Development

Use the committed npm lockfile:

```sh
npm ci
npm run dev
```

Before committing content or UI changes, run:

```sh
npm run validate:content
npm run typecheck
npm run build
```

`validate:content` checks the reading, cup, and brew-setup contracts, including
media paths and references between cups and setups. The production build also
regenerates `public/sitemap.xml`.

## Deployment

A push to `main` triggers [the Pages workflow](.github/workflows/deploy.yml),
which installs from `package-lock.json`, validates content, builds the static
export, and deploys `out/` through GitHub Pages. The workflow is also configured
to exercise changes proposed against `main`.

`npm run deploy` remains available for a manual `gh-pages` deployment, but the
normal production path is the push-triggered Pages workflow.
