"use client";

import { ProjectCard } from "@/components/project-card";
import BlurFade from "@/components/magicui/blur-fade";
import { DATA } from "@/data/resume";
import { useState } from "react";

const BLUR_FADE_DELAY = 0.04;

type ProjectStatus = "all" | "active" | "building";

export default function ProjectsPage() {
  const [filter, setFilter] = useState<ProjectStatus>("all");

  const filteredProjects = DATA.projects.filter((project) => {
    if (filter === "all") return true;
    if (filter === "active") return project.active;
    if (filter === "building") return !project.active;
    return true;
  });

  const activeCount = DATA.projects.filter((p) => p.active).length;
  const buildingCount = DATA.projects.filter((p) => !p.active).length;

  return (
    <main className="flex min-h-screen flex-col items-center">
      <div className="w-full space-y-6">
        {/* Header */}
        <BlurFade delay={BLUR_FADE_DELAY}>
          <div className="flex flex-col items-center text-center space-y-3 border-b border-border pb-6">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
              Projects
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              My projects and work across different technologies and domains.
            </p>
          </div>
        </BlurFade>

        {/* Filters */}
        <BlurFade delay={BLUR_FADE_DELAY * 2}>
          <div className="space-y-3">
            <h2 className="text-sm font-semibold text-muted-foreground tracking-wide uppercase">
              Filter by Status
            </h2>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setFilter("active")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  filter === "active"
                    ? "bg-foreground text-background shadow-md"
                    : "bg-muted/50 text-muted-foreground hover:bg-muted"
                }`}
              >
                Working ({activeCount})
              </button>
              <button
                onClick={() => setFilter("building")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  filter === "building"
                    ? "bg-foreground text-background shadow-md"
                    : "bg-muted/50 text-muted-foreground hover:bg-muted"
                }`}
              >
                Building ({buildingCount})
              </button>
            </div>
          </div>
        </BlurFade>

        {/* Projects Grid */}
        <BlurFade delay={BLUR_FADE_DELAY * 3}>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">
                All Projects{" "}
                <span className="text-muted-foreground text-sm">
                  ({filteredProjects.length} {filteredProjects.length === 1 ? "project" : "projects"})
                </span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredProjects.map((project, id) => (
                <BlurFade key={project.title} delay={BLUR_FADE_DELAY * 4 + id * 0.05}>
                  <ProjectCard
                    title={project.title}
                    description={project.description}
                    dates={project.dates}
                    tags={project.technologies}
                    image={project.image}
                    video={project.video}
                    links={project.links}
                    active={project.active}
                    slug={project.slug}
                  />
                </BlurFade>
              ))}
            </div>

            {filteredProjects.length === 0 && (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="size-16 rounded-full bg-muted/50 flex items-center justify-center mb-4">
                  <svg
                    className="size-8 text-muted-foreground"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">No projects found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your filters to see more projects.
                </p>
              </div>
            )}
          </div>
        </BlurFade>
      </div>
    </main>
  );
}
