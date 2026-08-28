import type { Metadata } from "next";
import CoffeeDetailClient from "./coffee-detail-client";
import { readFileSync } from "fs";
import { join } from "path";
import { coffeeEntries } from "@/data/site-data";
import { generateMetadata as makeMetadata } from "@/lib/seo";

interface CoffeeEntry {
  id: string;
  name: string;
  roaster: string;
  date: string;
  notes: string;
  pourOverRating?: number;
  americanoRating?: number;
  origin?: string;
  process?: string;
  status?: string;
}

// Generate static params for all coffee entries
export async function generateStaticParams() {
  try {
    // Read coffee data from the JSON file at build time
    const filePath = join(process.cwd(), "public", "data", "coffee.json");
    const fileContents = readFileSync(filePath, "utf8");
    const coffeeData = JSON.parse(fileContents);

    // Ensure we have valid data and it's an array
    if (!Array.isArray(coffeeData)) {
      console.warn("Coffee data is not an array, returning empty params");
      return [];
    }

    // Filter out entries without valid IDs
    const validEntries = coffeeData.filter(
      (coffee: any) => coffee && coffee.id
    );

    console.log(
      `Generating static params for ${validEntries.length} coffee entries`
    );

    return validEntries.map((coffee: any) => ({
      id: coffee.id,
    }));
  } catch (error) {
    console.error("Error generating static params:", error);
    console.warn("Falling back to empty params array");
    return [];
  }
}

export function generateMetadata({ params }: { params: { id: string } }): Metadata {
  const coffee = coffeeEntries.find((entry) => entry.id === params.id);
  if (!coffee) return {};
  return makeMetadata({
    title: coffee.name,
    description: coffee.notes && coffee.notes !== "No notes available"
      ? coffee.notes
      : `${coffee.name}, roasted by ${coffee.roaster}, in the coffee archive.`,
    url: `/coffee/${coffee.id}`,
    type: "article",
    tags: ["coffee", coffee.roaster, coffee.origin, coffee.process].filter((tag): tag is string => Boolean(tag)),
  });
}

export default function CoffeeDetailPage({
  params,
}: {
  params: { id: string };
}) {
  return <CoffeeDetailClient params={params} />;
}
