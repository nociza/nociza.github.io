"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SearchableIndex from "../../components/searchable-index";
import { allCoffeeData, CoffeeEntry } from "../../data/personal-data";

function CoffeeCard({ coffee, index }: { coffee: CoffeeEntry; index: number }) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <CardTitle className="text-xl font-inconsolata">
            {coffee.name}
          </CardTitle>
          <span className="text-sm text-muted-foreground font-inconsolata">
            {coffee.date}
          </span>
        </div>
        <p className="text-muted-foreground font-semibold font-inconsolata">
          {coffee.roaster}
        </p>
      </CardHeader>
      <CardContent>
        <p className="text-foreground leading-relaxed font-inconsolata">
          {coffee.notes}
        </p>
      </CardContent>
    </Card>
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
        items={allCoffeeData}
        searchFields={["name", "roaster", "notes"]}
        placeholder="Search by coffee name, roaster, or tasting notes..."
        renderItem={(coffee, index) => (
          <CoffeeCard key={index} coffee={coffee} index={index} />
        )}
      />
    </div>
  );
}
