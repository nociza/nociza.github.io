import { Metadata } from 'next'

export interface SEOProps {
    title?: string
    description?: string
    image?: string
    url?: string
    type?: 'website' | 'article' | 'profile'
    publishedTime?: string
    modifiedTime?: string
    authors?: string[]
    tags?: string[]
    section?: string
}

const defaultMetadata = {
    title: 'Yueheng [Alex] Zhang',
    description: 'Personal website of Yueheng [Alex] Zhang - Computer Vision Researcher, Coffee Enthusiast, and Tech Explorer',
    image: '/linkedin_pic.jpg',
    url: 'https://www.nociza.com',
    type: 'website' as const,
}

export function generateMetadata({
    title,
    description,
    image,
    url,
    type = 'website',
    publishedTime,
    modifiedTime,
    authors,
    tags,
    section,
}: SEOProps = {}): Metadata {
    const seoTitle = title
        ? `${title} | ${defaultMetadata.title}`
        : defaultMetadata.title

    const seoDescription = description || defaultMetadata.description
    const seoImage = image || defaultMetadata.image
    const seoUrl = url ? `${defaultMetadata.url}${url}` : defaultMetadata.url

    const metadata: Metadata = {
        title: seoTitle,
        description: seoDescription,
        keywords: [
            'Yueheng Zhang',
            'Alex Zhang',
            'Computer Vision',
            'Machine Learning',
            'Coffee',
            'Personal Website',
            'Research',
            'Technology',
            ...(tags || [])
        ],
        authors: authors ? authors.map(name => ({ name })) : [{ name: 'Yueheng Zhang' }],
        creator: 'Yueheng Zhang',
        publisher: 'Yueheng Zhang',
        metadataBase: new URL(defaultMetadata.url),
        alternates: {
            canonical: seoUrl,
        },
        openGraph: {
            title: seoTitle,
            description: seoDescription,
            url: seoUrl,
            siteName: 'nociza.com',
            images: [
                {
                    url: seoImage,
                    width: 1200,
                    height: 630,
                    alt: title || defaultMetadata.title,
                },
            ],
            locale: 'en_US',
            type,
            ...(type === 'article' && {
                publishedTime,
                modifiedTime,
                authors: authors || ['Yueheng Zhang'],
                section,
                tags,
            }),
        },
        twitter: {
            card: 'summary_large_image',
            title: seoTitle,
            description: seoDescription,
            images: [seoImage],
            creator: '@nociza',
            site: '@nociza',
        },
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                'max-video-preview': -1,
                'max-image-preview': 'large',
                'max-snippet': -1,
            },
        },
    }

    return metadata
}

export function generateJsonLd(data: any) {
    return {
        __html: JSON.stringify(data),
    }
}

export const personStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Yueheng Zhang',
    alternateName: 'Alex Zhang',
    url: 'https://www.nociza.com',
    image: 'https://www.nociza.com/linkedin_pic.jpg',
    sameAs: [
        'https://linkedin.com/in/nociza',
        'https://github.com/nociza',
        'https://twitter.com/nociza',
    ],
    jobTitle: 'Computer Vision Researcher',
    knowsAbout: [
        'Computer Vision',
        'Machine Learning',
        'Deep Learning',
        'Image Processing',
        'Coffee',
        'Technology',
    ],
    alumniOf: {
        '@type': 'Organization',
        name: 'University Name', // Update with actual university
    },
}

export const websiteStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Yueheng Zhang - Personal Website',
    url: 'https://www.nociza.com',
    description: 'Personal website of Yueheng [Alex] Zhang - Computer Vision Researcher, Coffee Enthusiast, and Tech Explorer',
    author: {
        '@type': 'Person',
        name: 'Yueheng Zhang',
    },
    inLanguage: 'en-US',
}

export const blogPostStructuredData = (props: {
    title: string
    description: string
    url: string
    datePublished?: string
    dateModified?: string
    image?: string
}) => ({
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: props.title,
    description: props.description,
    url: props.url,
    datePublished: props.datePublished,
    dateModified: props.dateModified || props.datePublished,
    image: props.image || 'https://www.nociza.com/linkedin_pic.jpg',
    author: {
        '@type': 'Person',
        name: 'Yueheng Zhang',
        url: 'https://www.nociza.com',
    },
    publisher: {
        '@type': 'Person',
        name: 'Yueheng Zhang',
        url: 'https://www.nociza.com',
    },
}) 