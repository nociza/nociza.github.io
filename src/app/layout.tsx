import type { Metadata } from "next";
import "../styles/globals.css";
import {
  generateMetadata,
  generateJsonLd,
  personStructuredData,
  websiteStructuredData,
} from "../lib/seo";

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
        <meta name="theme-color" content="#f4f4f1" />
        <meta name="color-scheme" content="light" />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={generateJsonLd(personStructuredData)}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={generateJsonLd(websiteStructuredData)}
        />
      </head>
      <body className="font-inconsolata">
        <a href="#site-content" className="skip-link">
          Skip to content
        </a>
        <div id="site-content" tabIndex={-1}>
          {children}
        </div>
      </body>
    </html>
  );
}
