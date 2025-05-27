"use client";

import Link from "next/link";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import SearchableIndex from "../../components/searchable-index";
import AddCoffeeForm from "../../components/add-coffee-form";
import { useCoffeeData } from "../../hooks/use-coffee-data";
import { NotionCoffeeEntry } from "@/lib/notion";

function CoffeeCard({
  coffee,
  index,
}: {
  coffee: NotionCoffeeEntry;
  index: number;
}) {
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
        <div className="flex items-center gap-2 mb-2">
          <p className="text-muted-foreground font-semibold font-inconsolata">
            {coffee.roaster}
          </p>
          {coffee.status === "currently_drinking" && (
            <Badge variant="secondary" className="text-xs">
              Currently Drinking
            </Badge>
          )}
        </div>
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
        {coffee.rating && (
          <p className="text-sm text-muted-foreground font-inconsolata">
            Rating: {coffee.rating}/10
          </p>
        )}
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
  const { coffeeData, loading, error } = useCoffeeData();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex items-center gap-2">
          <Loader2 className="w-6 h-6 animate-spin" />
          <span className="font-inconsolata">Loading coffee archive...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 font-inconsolata mb-4">
            Failed to load coffee archive from Notion
          </p>
          <p className="text-muted-foreground font-inconsolata text-sm">
            {error}
          </p>
        </div>
      </div>
    );
  }

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
        items={coffeeData}
        searchFields={["name", "roaster", "notes", "origin", "process"]}
        placeholder="Search by coffee name, roaster, origin, process, or tasting notes..."
        renderItem={(coffee: NotionCoffeeEntry, index: number) => (
          <CoffeeCard key={coffee.id} coffee={coffee} index={index} />
        )}
      />

      {/* Add Coffee Form */}
      <AddCoffeeForm />
    </div>
  );
}
