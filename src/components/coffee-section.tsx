import { coffeeData, CoffeeEntry } from "../data/personal-data";

interface CoffeeCardProps {
  coffee: CoffeeEntry;
  rank: number;
}

function CoffeeCard({ coffee, rank }: CoffeeCardProps) {
  return (
    <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-xl font-bold text-gray-800">
          #{rank} {coffee.name}
        </h3>
        <span className="text-sm text-gray-500 font-inconsolata">
          {coffee.date}
        </span>
      </div>
      <p className="text-gray-600 font-semibold mb-2">{coffee.roaster}</p>
      <p className="text-gray-700 leading-relaxed font-inconsolata">
        {coffee.notes}
      </p>
    </div>
  );
}

export default function CoffeeSection() {
  return (
    <section className="min-h-screen flex items-center justify-center page-container">
      <div className="max-w-4xl w-full">
        <h1 className="text-6xl font-bold text-gray-800 mb-4 font-serif">
          Coffee Diary
        </h1>
        <p className="text-xl text-gray-600 mb-12 font-inconsolata">
          My top 3 coffee discoveries, ranked by pure caffeinated joy
        </p>

        <div className="grid gap-8">
          {coffeeData.map((coffee, index) => (
            <CoffeeCard key={index} coffee={coffee} rank={index + 1} />
          ))}
        </div>
      </div>
    </section>
  );
}
