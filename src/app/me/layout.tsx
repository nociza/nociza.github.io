import {
  generateMetadata,
  generateJsonLd,
  personStructuredData,
} from "../../lib/seo";

export const metadata = generateMetadata({
  title: "About Me",
  description:
    "Learn about Yueheng [Alex] Zhang - Computer Vision Researcher, Coffee Enthusiast, and Tech Explorer. Discover my background, projects, and interests.",
  url: "/me",
  type: "profile",
  tags: [
    "about",
    "profile",
    "computer vision",
    "researcher",
    "portfolio",
    "resume",
  ],
});

export default function MeLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Additional structured data for person/profile page */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={generateJsonLd({
          ...personStructuredData,
          "@type": "ProfilePage",
          mainEntity: personStructuredData,
        })}
      />
      {children}
    </>
  );
}
