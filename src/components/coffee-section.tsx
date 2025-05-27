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
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <CardTitle className="text-xl font-inconsolata">
            <span className="text-orange-500">#{rank}</span> {coffee.name}
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

export default function CoffeeSection() {
  return (
    <section className="min-h-screen flex items-center justify-center page-container">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold text-gray-800 mb-4 font-serif">
            Coffee Diary
          </h1>
          <p className="text-xl text-gray-600 mb-6 font-inconsolata">
            My top 3 coffee discoveries, ranked by pure caffeinated joy
          </p>
          <Button
            variant="link"
            className="text-orange-500 hover:text-orange-600 p-0"
            asChild
          >
            <Link href="/coffee" className="inline-flex items-center gap-2">
              View Full Coffee Archive
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>

        <div className="grid gap-8">
          {coffeeData.map((coffee, index) => (
            <CoffeeCard key={index} coffee={coffee} rank={index + 1} />
          ))}
        </div>
      </div>
    </section>
  );
}
