"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Loader2,
  Calendar,
  MapPin,
  Coffee,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useCoffeeData } from "../../../hooks/use-coffee-data";

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

export default function CoffeeDetailClient({
  params,
}: {
  params: { id: string };
}) {
  const { coffeeEntries, loading } = useCoffeeData();
  const [coffee, setCoffee] = useState<CoffeeEntry | null>(null);

  useEffect(() => {
    if (coffeeEntries.length > 0) {
      const foundCoffee = coffeeEntries.find((c) => c.id === params.id);
      setCoffee(foundCoffee || null);
    }
  }, [coffeeEntries, params.id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center page-container">
        <div className="flex items-center gap-2">
          <Loader2 className="w-6 h-6 animate-spin" />
          <span className="font-inconsolata">Loading coffee details...</span>
        </div>
      </div>
    );
  }

  if (!coffee) {
    return (
      <div className="min-h-screen flex items-center justify-center page-container">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4 font-inconsolata">
            Coffee Not Found
          </h1>
          <p className="text-muted-foreground font-inconsolata mb-6">
            The coffee you're looking for doesn't exist or may have been
            removed.
          </p>
          <Button asChild>
            <Link href="/coffee" className="font-inconsolata">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Coffee Archive
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen page-container py-12">
      {/* Back Button */}
      <Button
        variant="outline"
        size="icon"
        className="fixed top-8 left-8 z-50 rounded-full hover:border-orange-500 hover:text-orange-500"
        asChild
      >
        <Link href="/coffee">
          <ArrowLeft className="w-4 h-4" />
        </Link>
      </Button>

      <div className="max-w-4xl mx-auto">
        <Card className="overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-orange-50 to-amber-50 border-b">
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-3xl font-bold font-inconsolata mb-2">
                  {coffee.name}
                </CardTitle>
                <p className="text-xl text-muted-foreground font-semibold font-inconsolata">
                  {coffee.roaster}
                </p>
              </div>
              <div className="text-right">
                {(coffee.status === "currently_drinking" ||
                  coffee.status === "Currently Drinking" ||
                  coffee.status === "Currently Brewing" ||
                  coffee.status?.toLowerCase().includes("current")) && (
                  <Badge variant="secondary" className="mb-2">
                    Currently Drinking
                  </Badge>
                )}
                <p className="text-sm text-muted-foreground font-inconsolata flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {coffee.date}
                </p>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-8">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Left Column - Details */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold font-inconsolata mb-3 flex items-center gap-2">
                    <Coffee className="w-5 h-5" />
                    Coffee Details
                  </h3>
                  <div className="space-y-3">
                    {coffee.origin && (
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        <span className="font-inconsolata text-sm">
                          <strong>Origin:</strong> {coffee.origin}
                        </span>
                      </div>
                    )}
                    {coffee.process && (
                      <div className="flex items-start gap-2">
                        <div className="w-4 h-4 bg-amber-200 rounded-full mt-1 flex-shrink-0" />
                        <span className="font-inconsolata text-sm">
                          <strong>Process:</strong> {coffee.process}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Ratings */}
                {(coffee.pourOverRating || coffee.americanoRating) && (
                  <div>
                    <h3 className="text-lg font-semibold font-inconsolata mb-3 flex items-center gap-2">
                      <Star className="w-5 h-5" />
                      My Ratings
                    </h3>
                    <div className="space-y-2">
                      {coffee.pourOverRating && (
                        <div className="flex items-center gap-3">
                          <span className="font-inconsolata text-sm font-medium w-20">
                            Pour Over:
                          </span>
                          <div className="flex items-center gap-2">
                            <div className="flex">
                              {[...Array(10)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < coffee.pourOverRating!
                                      ? "fill-orange-400 text-orange-400"
                                      : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="font-inconsolata text-sm text-muted-foreground">
                              {coffee.pourOverRating}/10
                            </span>
                          </div>
                        </div>
                      )}
                      {coffee.americanoRating && (
                        <div className="flex items-center gap-3">
                          <span className="font-inconsolata text-sm font-medium w-20">
                            Americano:
                          </span>
                          <div className="flex items-center gap-2">
                            <div className="flex">
                              {[...Array(10)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < coffee.americanoRating!
                                      ? "fill-amber-400 text-amber-400"
                                      : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="font-inconsolata text-sm text-muted-foreground">
                              {coffee.americanoRating}/10
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Right Column - Tasting Notes */}
              <div>
                <h3 className="text-lg font-semibold font-inconsolata mb-3">
                  Tasting Notes
                </h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="font-inconsolata text-sm leading-relaxed whitespace-pre-wrap">
                    {coffee.notes}
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mt-8 pt-6 border-t">
              <Button variant="outline" asChild className="font-inconsolata">
                <Link href="/coffee">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Archive
                </Link>
              </Button>
              <Button
                asChild
                className="bg-orange-500 hover:bg-orange-600 font-inconsolata"
              >
                <Link href="/me">Back to Home</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
