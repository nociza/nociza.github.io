export interface SitemapUrl {
    url: string
    lastModified?: Date
    changeFrequency?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'
    priority?: number
}

export function generateSitemap(urls: SitemapUrl[]): string {
    const urlEntries = urls
        .map((urlEntry) => {
            const { url, lastModified, changeFrequency, priority } = urlEntry
            return `  <url>
    <loc>${url}</loc>${lastModified ? `
    <lastmod>${lastModified.toISOString().split('T')[0]}</lastmod>` : ''}${changeFrequency ? `
    <changefreq>${changeFrequency}</changefreq>` : ''}${priority !== undefined ? `
    <priority>${priority}</priority>` : ''}
  </url>`
        })
        .join('\n')

    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>`
}

export const siteUrls: SitemapUrl[] = [
    {
        url: 'https://www.nociza.com/',
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 1.0,
    },
    {
        url: 'https://www.nociza.com/me/',
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.9,
    },
    {
        url: 'https://www.nociza.com/coffee/',
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
    },
    {
        url: 'https://www.nociza.com/books/',
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
    },
    {
        url: 'https://www.nociza.com/papers/',
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
    },
    {
        url: 'https://www.nociza.com/music/',
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.7,
    },
    {
        url: 'https://www.nociza.com/preface/',
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.6,
    },
    {
        url: 'https://www.nociza.com/my-gf/',
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.5,
    },
    {
        url: 'https://www.nociza.com/compvision/',
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
    },
    {
        url: 'https://www.nociza.com/book/',
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.6,
    },
    {
        url: 'https://www.nociza.com/navigation/',
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.5,
    },
] 