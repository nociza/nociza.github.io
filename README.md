# nociza.github.io

Personal website of Yueheng [Alex] Zhang - Migrated to Next.js 14

## 🚀 Migration Complete

This project has been successfully migrated from **Gatsby v4** to **Next.js 14** with the following improvements:

### ✨ Modern Stack
- **Next.js 14** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for modern styling
- **React 18** with latest features
- **Framer Motion** for animations

### 🎯 Features Preserved
- ✅ Interactive Lorenz Attractor canvas animation
- ✅ All original pages and content
- ✅ Hover interactions and animations
- ✅ Responsive design
- ✅ GitHub Pages deployment
- ✅ Custom domain support (www.nociza.com)

### 📁 Project Structure
```
├── docs/                   # Documentation
│   ├── GITHUB_PAGES_SETUP.md
│   ├── NOTION_SETUP.md
│   └── ENVIRONMENT_SETUP.md
├── setup-scripts/          # Setup and utility scripts
│   ├── setup-notion.js
│   ├── setup-papers-notion.js
│   ├── check-notion.js
│   └── check-papers-notion.js
├── scripts/                # Build and deployment scripts
├── src/                    # Source code
│   ├── app/               # Next.js App Router pages
│   │   ├── layout.tsx     # Root layout with metadata
│   │   ├── page.tsx       # Home page (redirects to /me)
│   │   ├── me/page.tsx    # Main resume/about page
│   │   ├── book/page.tsx  # Interactive book page
│   │   ├── preface/page.tsx # Preface page
│   │   ├── my-gf/page.tsx # Brain with water page
│   │   ├── navigation/page.tsx # Navigation/index page
│   │   ├── compvision/page.tsx # Computer vision projects
│   │   └── not-found.tsx  # 404 page
│   ├── components/
│   │   └── lorenz-canvas.tsx # Interactive canvas component
│   ├── hooks/             # Custom React hooks
│   ├── lib/
│   │   └── utils.ts       # Utility functions
│   └── styles/
│       └── globals.css    # Global styles with Tailwind
├── public/                # Static assets
│   ├── data/             # JSON data files
│   └── *.{jpg,png,ico}   # Images and icons
└── Configuration files
    ├── next.config.js
    ├── tailwind.config.js
    ├── tsconfig.json
    ├── package.json
    └── components.json
```

## 🛠️ Development

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation
```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

### Available Scripts
```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run start      # Start production server
npm run lint       # Run ESLint
npm run export     # Build static export
npm run deploy     # Deploy to GitHub Pages
npm run typecheck  # Run TypeScript checks
```

## 📚 Documentation

Detailed setup and deployment guides are available in the `docs/` directory:

- **[Environment Setup](docs/ENVIRONMENT_SETUP.md)** - Development environment configuration
- **[Notion Setup](docs/NOTION_SETUP.md)** - Notion integration for dynamic content
- **[GitHub Pages Setup](docs/GITHUB_PAGES_SETUP.md)** - Deployment configuration

## 🔧 Setup Scripts

Use the scripts in `setup-scripts/` to configure integrations:

```bash
# Set up Notion integration
node setup-scripts/setup-notion.js

# Check Notion connection
node setup-scripts/check-notion.js

# Set up papers/research integration
node setup-scripts/setup-papers-notion.js

# Check papers integration
node setup-scripts/check-papers-notion.js
```

## 🚀 Deployment

The site is configured for GitHub Pages deployment:

```bash
npm run deploy
```

This will:
1. Build the static export
2. Add CNAME file for custom domain
3. Deploy to GitHub Pages

## 🎨 Design System

The original design has been preserved using:
- Custom CSS classes for typography
- Tailwind utilities for layout
- Original color scheme and fonts
- Interactive hover effects

### Typography Classes
- `.heading-normal` - Main headings (Inconsolata, 6vw)
- `.heading-fancy` - Fancy headings (Trattatello, 4vw)
- `.heading-accent` - Accent links (orange color)
- `.body-normal` - Body text (Inconsolata, 2vw)
- `.body-ref` - Reference links (orange, bold)

## 🎯 Key Improvements

1. **Performance**: Next.js optimizations, image optimization
2. **Developer Experience**: Better TypeScript support, faster builds
3. **Modern Tooling**: Tailwind CSS, ESLint, modern React patterns
4. **Maintainability**: Cleaner component structure, better organization
5. **Future-proof**: Latest React features, App Router

## 📱 Pages

- `/` - Home (redirects to /me)
- `/me` - Main resume/portfolio page
- `/book` - Interactive "Book of Me" page
- `/preface` - Preface page
- `/my-gf` - "Brain with Water" page
- `/navigation` - Site index
- `/compvision` - Computer vision project reports

## 🎨 Interactive Features

- **Lorenz Attractor Canvas**: Mouse-following particle system
- **Hover Effects**: Name changes, link highlighting
- **Collapsible Sections**: Education, experience, projects, skills
- **Word Interactions**: Hover definitions on book page

## 🔧 Configuration

- **Next.js**: Configured for static export to GitHub Pages
- **TypeScript**: Strict mode with path aliases
- **Tailwind**: Custom design system with original colors/fonts
- **ESLint**: Next.js recommended configuration

---

Built with ❤️ using Next.js 14 

<!-- Force deployment Fri May 30 13:37:22 PDT 2025 --> 