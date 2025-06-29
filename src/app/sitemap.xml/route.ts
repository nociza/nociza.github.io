import { generateSitemap, siteUrls } from '../../lib/sitemap'

export async function GET() {
    // You can add dynamic content here, like coffee entries, papers, etc.
    // For example, you could fetch coffee entries and add them to the sitemap

    const sitemap = generateSitemap(siteUrls)

    return new Response(sitemap, {
        headers: {
            'Content-Type': 'application/xml',
            'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
        },
    })
} 