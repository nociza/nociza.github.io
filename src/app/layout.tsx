import type { Metadata } from "next";
import { Inconsolata, Roboto } from "next/font/google";
import "../styles/globals.css";

const inconsolata = Inconsolata({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-inconsolata",
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: "Yueheng [Alex] Zhang",
  description: "Personal website of Yueheng [Alex] Zhang",
  metadataBase: new URL("https://www.nociza.com"),
  openGraph: {
    title: "Yueheng [Alex] Zhang",
    description: "Personal website of Yueheng [Alex] Zhang",
    url: "https://www.nociza.com",
    siteName: "nociza.com",
    images: [
      {
        url: "/linkedin_pic.jpg",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Yueheng [Alex] Zhang",
    description: "Personal website of Yueheng [Alex] Zhang",
    images: ["/linkedin_pic.jpg"],
  },
  icons: {
    icon: "/icon.png",
    shortcut: "/favicon-32x32.png",
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
      </head>
      <body
        className={`${inconsolata.variable} ${roboto.variable} font-inconsolata`}
      >
        {children}
      </body>
    </html>
  );
}
