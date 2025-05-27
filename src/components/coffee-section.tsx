import Link from "next/link";
import { ArrowRight, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCoffeeData } from "../hooks/use-coffee-data";
import { NotionCoffeeEntry } from "@/lib/notion";

interface CoffeeCardProps {
  coffee: NotionCoffeeEntry;
  rank?: number;
}

function CoffeeCard({ coffee, rank }: CoffeeCardProps) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-lg font-inconsolata">
          {coffee.name}
        </CardTitle>
        <p className="text-muted-foreground font-semibold font-inconsolata">
          {coffee.roaster}
        </p>
        {coffee.status === "currently_drinking" && (
          <Badge variant="secondary" className="w-fit">
            Currently Drinking
          </Badge>
        )}
        <span className="text-sm text-muted-foreground font-inconsolata">
          {coffee.date}
        </span>
      </CardHeader>
      <CardContent>
        {coffee.origin && (
          <p className="text-sm text-muted-foreground mb-1 font-inconsolata">
            Origin: {coffee.origin}
          </p>
        )}
        {coffee.process && (
          <p className="text-sm text-muted-foreground mb-1 font-inconsolata">
            Process: {coffee.process}
          </p>
        )}
        {coffee.rating && (
          <p className="text-sm text-muted-foreground mb-2 font-inconsolata">
            Rating: {coffee.rating}/10
          </p>
        )}
        <p className="text-foreground leading-relaxed font-inconsolata text-sm">
          {coffee.notes}
        </p>
      </CardContent>
    </Card>
  );
}

export default function CoffeeSection() {
  const { currentlyDrinking, loading, error } = useCoffeeData();

  if (loading) {
    return (
      <section className="min-h-screen flex items-center justify-center page-container">
        <div className="flex items-center gap-2">
          <Loader2 className="w-6 h-6 animate-spin" />
          <span className="font-inconsolata">Loading coffee data...</span>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="min-h-screen flex items-center justify-center page-container">
        <div className="text-center">
          <p className="text-red-500 font-inconsolata mb-4">
            Failed to load coffee data from Notion
          </p>
          <p className="text-muted-foreground font-inconsolata text-sm">
            {error}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen flex items-center justify-center page-container">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold text-gray-800 mb-4 font-serif">
            Coffee Discovery
          </h1>
          <p className="text-xl text-gray-600 mb-6 font-inconsolata">
            Currently drinking and recent discoveries
          </p>
          <Button
            variant="link"
            className="text-orange-500 hover:text-orange-600 p-0"
            asChild
          >
            <Link href="/coffee" className="inline-flex items-center gap-2">
              View Full Discovery Archive
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentlyDrinking.length > 0 ? (
            currentlyDrinking.map(
              (coffee: NotionCoffeeEntry, index: number) => (
                <CoffeeCard key={coffee.id} coffee={coffee} rank={index + 1} />
              )
            )
          ) : (
            <div className="col-span-full text-center">
              <p className="text-muted-foreground font-inconsolata mb-2">
                No coffee currently being tracked
              </p>
              <p className="text-sm text-muted-foreground font-inconsolata">
                Set up Notion integration to track your coffee discoveries
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
