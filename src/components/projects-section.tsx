import Link from "next/link";
import { Archive, ArrowUpRight, BookOpen, Boxes } from "lucide-react";
import { ProjectCategory, projectEntries } from "@/data/project-data";

const categoryDetails: Record<ProjectCategory, { label: string; icon: typeof Boxes }> = {
  current: { label: "In progress", icon: Boxes },
  archive: { label: "Earlier work", icon: Archive },
  course: { label: "Course project", icon: BookOpen },
};

export default function ProjectsSection() {
  return (
    <div className="min-h-[100dvh] bg-[#eef0ed]/65 px-6 py-10 sm:px-10">
      <div className="mx-auto flex min-h-[calc(100dvh-5rem)] max-w-6xl flex-col justify-center">
        <header className="mb-5 grid gap-4 border-b border-black/10 pb-5 lg:grid-cols-[minmax(0,1fr)_minmax(17rem,0.55fr)] lg:items-end">
          <div>
            <p className="mb-3 text-xs uppercase tracking-[0.2em] text-neutral-500">Systems · experiments · coursework</p>
            <h2 id="projects-heading" className="font-serif text-4xl font-semibold leading-none tracking-[-0.04em] text-neutral-950 sm:text-5xl">
              Things I build.
            </h2>
          </div>
          <p className="max-w-lg text-sm leading-6 text-neutral-600 lg:justify-self-end">
            A living gallery of current systems, earlier experiments, and course work—kept outside the résumé so there is room for it to grow.
          </p>
        </header>

        <div
          aria-label="Project gallery"
          className="-mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-3 sm:mx-0 sm:grid sm:snap-none sm:grid-cols-2 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-3"
        >
          {projectEntries.map((project, index) => {
            const details = categoryDetails[project.category];
            const CategoryIcon = details.icon;
            const external = project.href.startsWith("http");

            return (
              <Link
                key={`${project.category}-${project.title}`}
                href={project.href}
                target={external ? "_blank" : undefined}
                rel={external ? "noreferrer" : undefined}
                className="group flex min-h-64 min-w-[82vw] snap-start flex-col rounded-2xl border border-black/10 bg-white/65 p-5 transition hover:-translate-y-0.5 hover:border-black/20 hover:bg-white focus-visible:outline-none sm:min-h-[8.5rem] sm:min-w-0 sm:p-4"
              >
                <div className="flex items-center justify-between gap-4 text-[11px] text-neutral-500">
                  <span className="inline-flex items-center gap-1.5">
                    <CategoryIcon aria-hidden="true" className="h-3.5 w-3.5 stroke-[1.4]" />
                    {details.label}
                  </span>
                  <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                </div>

                <h3 className="mt-6 font-serif text-2xl font-medium leading-tight tracking-[-0.025em] text-neutral-950 sm:mt-3 sm:text-xl">
                  {project.title}
                </h3>
                <p className="mt-3 line-clamp-3 text-sm leading-6 text-neutral-600 sm:mt-1.5 sm:line-clamp-1 sm:text-xs sm:leading-5">
                  {project.description}
                </p>

                <div className="mt-auto flex items-end justify-between gap-4 pt-6 text-[11px] text-neutral-500 sm:pt-3">
                  <span>{project.period ?? (external ? "Open project" : "View reports")}</span>
                  <ArrowUpRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-neutral-900" />
                </div>
              </Link>
            );
          })}
        </div>

        <p className="mt-3 text-xs text-neutral-500 sm:hidden">Swipe to browse the gallery.</p>
      </div>
    </div>
  );
}
