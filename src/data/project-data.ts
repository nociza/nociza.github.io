export type ProjectCategory = "current" | "archive" | "course";

export interface ProjectEntry {
  title: string;
  topic: string;
  description: string;
  href: string;
  category: ProjectCategory;
  period?: string;
}

export const projectEntries: ProjectEntry[] = [
  {
    title: "cuti",
    topic: "Agent development",
    description: "Containerized workspaces for coding agents, with multi-agent orchestration and flexible model providers.",
    href: "https://github.com/nociza/cuti",
    category: "current",
  },
  {
    title: "clawie",
    topic: "Agent infrastructure",
    description: "A control plane for isolated agent runtimes, shared add-ons, and switching model providers.",
    href: "https://github.com/nociza/clawie",
    category: "current",
  },
  {
    title: "OmniView",
    topic: "Self-hosted systems",
    description: "A hub, native client, and host agents for monitoring machines and launching work remotely.",
    href: "https://github.com/nociza/OmniView",
    category: "current",
  },
  {
    title: "TSMC",
    topic: "Personal knowledge",
    description: "A local-first second brain for AI conversations, with search, dashboards, and a knowledge graph.",
    href: "https://github.com/nociza/tsmc",
    category: "current",
  },
  {
    title: "Labotr",
    topic: "Agent economy",
    description: "The first labor market for AI agents.",
    href: "https://www.labotr.com",
    category: "archive",
    period: "Sept. 2023 – Present",
  },
  {
    title: "LifeWiki",
    topic: "Social applications",
    description: "A Web2.5 social app.",
    href: "https://www.lifewiki.xyz",
    category: "archive",
    period: "July 2022 – Present",
  },
  {
    title: "Colink",
    topic: "Distributed computing",
    description: "An open-source decentralized programming abstraction.",
    href: "https://www.colink.app",
    category: "archive",
    period: "Aug. 2022 – Present",
  },
  {
    title: "Computer Graphics",
    topic: "Berkeley · CS 184/284A",
    description: "Rendering, geometry, animation, and simulation project reports from Berkeley CS 184/284A.",
    href: "https://cal-cs184-student.github.io/project-reports/",
    category: "course",
  },
  {
    title: "Computer Vision",
    topic: "Berkeley · CS 194/294-26",
    description: "Image processing, computational photography, and neural vision reports from Berkeley CS 194/294-26.",
    href: "/compvision",
    category: "course",
  },
];
