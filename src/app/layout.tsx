import type { Metadata } from "next";
import { Inconsolata, Roboto } from "next/font/google";
import "../styles/globals.css";
import {
  generateMetadata,
  generateJsonLd,
  personStructuredData,
  websiteStructuredData,
} from "../lib/seo";

const inconsolata = Inconsolata({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-inconsolata",
  display: "swap",
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-roboto",
  display: "swap",
});

export const metadata: Metadata = {
  ...generateMetadata({
    title: undefined, // Use default title
    description: undefined, // Use default description
    url: "",
    type: "website",
  }),
  icons: {
    icon: "/icon.png",
    shortcut: "/favicon-32x32.png",
    apple: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta name="color-scheme" content="light dark" />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={generateJsonLd(personStructuredData)}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={generateJsonLd(websiteStructuredData)}
        />

        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />

        {/* Optimized font loading */}
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inconsolata:wght@400;700&family=Fira+Code:wght@300;400;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;700&family=Inter:wght@300;400;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Dancing+Script:wght@400;700&display=swap"
          rel="stylesheet"
        />

        {/* Custom font fallbacks */}
        <style>{`
          @font-face {
            font-family: 'Trattatello-fallback';
            src: local('Trattatello'), local('Brush Script MT'), local('Lucida Handwriting'), local('Dancing Script');
            font-display: swap;
          }
          @font-face {
            font-family: 'Chalkduster-fallback'; 
            src: local('Chalkduster'), local('Bradley Hand'), local('Marker Felt'), local('Dancing Script');
            font-display: swap;
          }
        `}</style>

        {/* DNS prefetch for performance */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
      </head>
      <body
        className={`${inconsolata.variable} ${roboto.variable} font-inconsolata`}
      >
        {children}
      </body>
    </html>
  );
}
