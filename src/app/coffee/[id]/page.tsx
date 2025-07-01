import { Suspense } from "react";
import { Loader2 } from "lucide-react";
import CoffeeDetailClient from "./coffee-detail-client";
import { readFileSync } from "fs";
import { join } from "path";

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

export default function CoffeeDetailPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center page-container">
          <div className="flex items-center gap-2">
            <Loader2 className="w-6 h-6 animate-spin" />
            <span className="font-inconsolata">Loading coffee details...</span>
          </div>
        </div>
      }
    >
      <CoffeeDetailClient params={params} />
    </Suspense>
  );
}
