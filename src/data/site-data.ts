import coffeeCurrentJson from "../../public/data/coffee-current.json";
import coffeeJson from "../../public/data/coffee.json";
import papersJson from "../../public/data/papers.json";

export interface CoffeeEntry {
  id: string;
  name: string;
  roaster: string;
  date: string;
  notes: string;
  rating?: number | null;
  pourOverRating?: number | null;
  americanoRating?: number | null;
  origin?: string;
  process?: string;
  status?: string;
  roasterLink?: string;
}

export interface ArxivPaper {
  id: string;
  arxivId: string;
  url: string;
  title: string;
  authors: string[];
  abstract: string;
  publishedDate: string;
  categories: string[];
  status?: string;
}

export const coffeeEntries = coffeeJson as CoffeeEntry[];
export const currentlyDrinking = coffeeCurrentJson as CoffeeEntry[];
export const papers = papersJson as ArxivPaper[];
