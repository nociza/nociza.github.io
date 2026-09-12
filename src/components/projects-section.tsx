"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ProjectCategory, projectEntries } from "@/data/project-data";
import styles from "./projects-section.module.css";

const categories: { id: ProjectCategory; label: string }[] = [
  { id: "current", label: "Current work" },
  { id: "archive", label: "Earlier work" },
  { id: "course", label: "Coursework" },
];

export default function ProjectsSection() {
  const [category, setCategory] = useState<ProjectCategory>("current");
  const projects = projectEntries.filter((project) => project.category === category);
  const categoryLabel = categories.find((item) => item.id === category)!.label;

  return (
    <div className={styles.section}>
      <div className={styles.inner}>
        <header className={styles.header}>
          <div>
            <p className={styles.eyebrow}>Selected projects</p>
            <h2 id="projects-heading" className={styles.title}>Things I build.</h2>
          </div>
          <p className={styles.intro}>
            Tools for agents, systems for people, and experiments along the way.
          </p>
        </header>

        <div className={styles.filters} role="group" aria-label="Filter projects">
          {categories.map((item) => (
            <button
              key={item.id}
              type="button"
              aria-pressed={category === item.id}
              aria-controls="project-gallery"
              onClick={() => setCategory(item.id)}
              className={styles.filter}
            >
              {item.label}
              <span className={styles.count}>
                <span className="sr-only">: </span>
                {String(projectEntries.filter((project) => project.category === item.id).length).padStart(2, "0")}
                <span className="sr-only"> projects</span>
              </span>
            </button>
          ))}
        </div>

        <p className="sr-only" role="status">
          {categoryLabel}: {projects.length} projects shown.
        </p>
        <div className={styles.galleryFrame}>
          <ul id="project-gallery" aria-label={categoryLabel} className={styles.gallery}>
            {projects.map((project) => {
              const external = project.href.startsWith("http");
              const destination = project.category === "course"
                ? "Explore reports"
                : project.href.startsWith("https://github.com/") ? "View on GitHub" : "Visit project";

              const body = <>                    <div className={styles.cardHeader}>
                      <span className={styles.topic}>{project.topic}</span>
                      <ArrowUpRight aria-hidden="true" className={styles.arrow} />
                    </div>
                    <h3 className={styles.projectTitle}>{project.title}</h3>
                    <p className={styles.description}>{project.description}</p>
                    <span className={styles.destination}>
                      {project.unavailable ? "Archived · website currently unavailable" : destination}
                      {external && <span className="sr-only"> (opens in a new tab)</span>}
                    </span>
</>;
              return (
                <li key={project.title}>
                  {project.unavailable ? <article className={styles.card}>{body}</article> : <Link href={project.href} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined} className={styles.card}>{body}</Link>}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
