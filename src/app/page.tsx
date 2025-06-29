import { Metadata } from "next";
import { redirect } from "next/navigation";
import { generateMetadata } from "../lib/seo";

export const metadata: Metadata = generateMetadata({
  title: undefined, // Use default title
  description: undefined, // Use default description
  url: "/",
  type: "website",
});

export default function IndexPage() {
  // Redirect to /me on the server side for better SEO
  redirect("/me");
}
