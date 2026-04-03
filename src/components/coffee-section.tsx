import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CoffeeEntry, currentlyDrinking } from "../data/site-data";

interface CoffeeCardProps {
  coffee: CoffeeEntry;
  type?: "currently_drinking" | "all_time_favorite";
}

const allTimeFavorites: CoffeeEntry[] = [
  {
    id: "counter-culture-hologram",
    name: "Hologram",
    roaster: "Counter Culture Coffee",
    date: "All-Time Favorite",
    notes:
      "A vibrant and complex coffee with bright floral notes and citrus acidity. This Ethiopian coffee showcases the best of Counter Culture's sourcing and roasting.",
    origin: "Ethiopia",
    roasterLink: "https://counterculturecoffee.com",
  },
  {
    id: "sw-guatemala-hunapu",
    name: "Guatemala Hunapu",
    roaster: "S&W Coffee",
    date: "All-Time Favorite",
    notes:
      "Rich chocolate and caramel notes with a smooth, full body. This Guatemalan coffee still stands out as one of my favorite everyday brews.",
    origin: "Guatemala",
    roasterLink: "https://swroasting.coffee",
  },
];

function CoffeeCard({ coffee, type }: CoffeeCardProps) {
  const isCurrentlyDrinking = type === "currently_drinking" || 
    coffee.status === "currently_drinking" ||
    coffee.status === "Currently Drinking" ||
    coffee.status === "Currently Brewing" ||
    coffee.status?.toLowerCase().includes("current");
    
  const isAllTimeFavorite = type === "all_time_favorite";
  
  return (
    <div className="relative">
      {isCurrentlyDrinking && (
        <Badge variant="secondary" className="absolute -top-2 -right-2 text-xs z-10">
          Currently Drinking
        </Badge>
      )}
      {isAllTimeFavorite && (
        <Badge className="absolute -top-2 -right-2 text-xs bg-gradient-to-r from-orange-500 to-amber-500 text-white border-0 shadow-sm z-10">
          ⭐ Favorite
        </Badge>
      )}
      <Link href={coffee.id ? `/coffee/${coffee.id}` : "#"}>
        <Card className={`h-full hover:shadow-lg transition-all cursor-pointer ${
          isAllTimeFavorite 
            ? 'border-orange-200 hover:border-orange-400' 
            : 'border-gray-200 hover:border-gray-300'
        }`}>
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

          {/* Ratings Section */}
          {(coffee.pourOverRating || coffee.americanoRating) && (
            <div className="mb-2">
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

          <p className="text-foreground leading-relaxed font-inconsolata text-sm line-clamp-3">
            {coffee.notes}
          </p>
        </CardContent>
        </Card>
      </Link>
    </div>
  );
}

export default function CoffeeSection() {
  // Prioritize all-time favorites first, then add currently drinking if there's space
  const maxCards = 4;
  const allTimeFavoritesWithType = allTimeFavorites.map((coffee: CoffeeEntry) => ({ 
    ...coffee, 
    type: "all_time_favorite" as const 
  }));
  const currentlyDrinkingWithType = currentlyDrinking.map((coffee: CoffeeEntry) => ({ 
    ...coffee, 
    type: "currently_drinking" as const 
  }));

  // Always show all-time favorites first, fill remaining slots with currently drinking
  const remainingSlots = Math.max(0, maxCards - allTimeFavoritesWithType.length);
  const displayedCoffees = [
    ...allTimeFavoritesWithType,
    ...currentlyDrinkingWithType.slice(0, remainingSlots)
  ];

  return (
    <div className="min-h-screen flex items-center justify-center page-container">
      <div className="max-w-5xl w-full px-6">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-gray-800 mb-3 font-serif">
            Coffee Discovery
          </h1>
          <p className="text-lg text-gray-600 mb-4 font-inconsolata">
            Currently drinking and all-time favorites
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

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-h-[60vh]">
          {displayedCoffees.length > 0 ? (
            displayedCoffees.map((coffee) => (
              <CoffeeCard 
                key={coffee.id} 
                coffee={coffee} 
                type={coffee.type}
              />
            ))
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
    </div>
  );
}
