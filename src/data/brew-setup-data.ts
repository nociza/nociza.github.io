import setupJson from "../../public/data/brew-setups.json";

export interface BrewSetupTool {
  name: string;
  role: string | null;
  notes: string | null;
}

export interface BrewSetup {
  id: string;
  slug: string;
  name: string;
  summary: string;
  description: string;
  image: {
    src: string;
    alt: string;
  };
  methods: string[];
  tools: BrewSetupTool[];
  tags: string[];
  receivedAt: string;
  publishedAt: string;
  updatedAt: string;
}

export const brewSetups = setupJson as BrewSetup[];

export function findBrewSetup(identifier: string): BrewSetup | undefined {
  return brewSetups.find((setup) => setup.id === identifier || setup.slug === identifier);
}
