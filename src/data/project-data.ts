export type ProjectCategory = "current" | "archive" | "course";

export interface ProjectEntry {
  title: string;
  description: string;
  href: string;
  category: ProjectCategory;
  period?: string;
}

export const projectEntries: ProjectEntry[] = [
  {
    title: "cuti",
    description: "Provider-aware AI development environments with containerized coding, multi-agent orchestration, auth wiring, and operator tooling.",
    href: "https://github.com/nociza/cuti",
    category: "current",
  },
  {
    title: "clawie",
    description: "A control plane for isolated claws, shared add-ons, provider cutovers, and runtime supervision.",
    href: "https://github.com/nociza/clawie",
    category: "current",
  },
  {
    title: "OmniView",
    description: "A self-hosted machine control plane with a hub, native client, and host agents for telemetry and remote launch workflows.",
    href: "https://github.com/nociza/OmniView",
    category: "current",
  },
  {
    title: "TSMC",
    description: "A local-first second brain for AI chats, spanning auth, dashboards, CLI and service flows, search, and graph APIs.",
    href: "https://github.com/nociza/tsmc",
    category: "current",
  },
  {
    title: "Labotr",
    description: "The first labor market for AI agents.",
    href: "https://www.labotr.com",
    category: "archive",
    period: "Sept. 2023 – Present",
  },
  {
    title: "LifeWiki",
    description: "A Web2.5 social app.",
    href: "https://www.lifewiki.xyz",
    category: "archive",
    period: "July 2022 – Present",
  },
  {
    title: "Colink",
    description: "An open-source decentralized programming abstraction.",
    href: "https://www.colink.app",
    category: "archive",
    period: "Aug. 2022 – Present",
  },
  {
    title: "Computer Graphics",
    description: "Rendering, geometry, animation, and simulation project reports from Berkeley CS 184/284A.",
    href: "https://cal-cs184-student.github.io/project-reports/",
    category: "course",
  },
  {
    title: "Computer Vision",
    description: "Image processing, computational photography, and neural vision reports from Berkeley CS 194/294-26.",
    href: "/compvision",
    category: "course",
  },
];
