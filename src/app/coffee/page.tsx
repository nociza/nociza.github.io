"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import SearchableIndex from "../../components/searchable-index";
import { CoffeeEntry, coffeeEntries } from "../../data/site-data";

function CoffeeCard({ coffee, index }: { coffee: CoffeeEntry; index: number }) {
  const isCurrentlyDrinking = coffee.status === "currently_drinking" ||
    coffee.status === "Currently Drinking" ||
    coffee.status === "Currently Brewing" ||
    coffee.status?.toLowerCase().includes("current");

  return (
    <div className="relative">
      {isCurrentlyDrinking && (
        <Badge variant="secondary" className="absolute -top-2 -right-2 text-xs z-10">
          Currently Drinking
        </Badge>
      )}
      <Link href={`/coffee/${coffee.id}`}>
        <Card className="hover:shadow-lg transition-all cursor-pointer border-gray-200 hover:border-gray-300">
          <CardHeader>
            <CardTitle className="text-lg font-inconsolata">
              {coffee.name}
            </CardTitle>
            {coffee.roasterLink ? (
              <Link 
                href={coffee.roasterLink} 
                target="_blank"
                rel="noopener noreferrer"
                className="text-orange-500 hover:text-orange-600 font-semibold font-inconsolata transition-colors inline-block"
                onClick={(e) => e.stopPropagation()}
              >
                {coffee.roaster}
              </Link>
            ) : (
              <p className="text-muted-foreground font-semibold font-inconsolata">
                {coffee.roaster}
              </p>
            )}
            <span className="text-sm text-muted-foreground font-inconsolata">
              {coffee.date}
            </span>
          {coffee.origin && (
            <p className="text-sm text-muted-foreground font-inconsolata">
              Origin: {coffee.origin}
            </p>
          )}
          {coffee.process && (
            <p className="text-sm text-muted-foreground font-inconsolata">
              Process: {coffee.process}
            </p>
          )}

          {/* Ratings Section */}
          {(coffee.pourOverRating || coffee.americanoRating) && (
            <div className="mb-1">
              {coffee.pourOverRating && (
                <p className="text-sm text-muted-foreground font-inconsolata">
                  Pour Over: {coffee.pourOverRating}/10
                </p>
              )}
              {coffee.americanoRating && (
                <p className="text-sm text-muted-foreground font-inconsolata">
                  Americano: {coffee.americanoRating}/10
                </p>
              )}
            </div>
          )}
        </CardHeader>
        <CardContent>
          <p className="text-foreground leading-relaxed font-inconsolata line-clamp-4">
            {coffee.notes}
          </p>
        </CardContent>
        </Card>
      </Link>
    </div>
  );
}

export default function CoffeeIndexPage() {
  return (
    <div className="relative">
      {/* Back Button */}
      <Button
        variant="outline"
        size="icon"
        className="fixed top-8 left-8 z-50 rounded-full hover:border-orange-500 hover:text-orange-500"
        asChild
      >
        <Link href="/me">
          <ArrowLeft className="w-4 h-4" />
        </Link>
      </Button>

      <SearchableIndex
        title="Coffee Discovery Archive"
        items={coffeeEntries}
        searchFields={["name", "roaster", "notes", "origin", "process"]}
        placeholder="Search by coffee name, roaster, origin, process, or tasting notes..."
        renderItem={(coffee: CoffeeEntry, index: number) => (
          <CoffeeCard key={coffee.id} coffee={coffee} index={index} />
        )}
      />
    </div>
  );
}
