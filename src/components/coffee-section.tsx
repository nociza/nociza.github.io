import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { coffeeData, CoffeeEntry } from "../data/personal-data";

interface CoffeeCardProps {
  coffee: CoffeeEntry;
  rank: number;
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
        <span className="text-sm text-muted-foreground font-inconsolata">
          {coffee.date}
        </span>
      </CardHeader>
      <CardContent>
        <p className="text-foreground leading-relaxed font-inconsolata text-sm">
          {coffee.notes}
        </p>
      </CardContent>
    </Card>
  );
}

export default function CoffeeSection() {
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
          {coffeeData.map((coffee, index) => (
            <CoffeeCard key={index} coffee={coffee} rank={index + 1} />
          ))}
        </div>
      </div>
    </section>
  );
}
