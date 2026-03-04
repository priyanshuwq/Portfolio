"use client";

import BlurFade from "@/components/magicui/blur-fade";
import BlurFadeText from "@/components/magicui/blur-fade-text";
import { ProjectCard } from "@/components/project-card";
import { BlogCard } from "@/components/blog-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { DATA } from "@/data/resume";
import { FileText, CalendarDays } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import React, { Suspense, lazy } from "react";
import { Card } from "@/components/ui/card";
import { SkillIcon } from "@/components/skill-icons";
import { MusicNowPlaying } from "@/components/music-now-playing";
import { AnimatedTitle } from "@/components/animated-title";
import { ToolsMarquee } from "@/components/tools-marquee";
import { PfpAvatar } from "@/components/pfp-avatar";
import { ContactSection } from "@/components/contact-section";
import { ParticleImage } from "@/components/particle-image";


const GitHubContributions = lazy(() =>
  import("@/components/github-contributions").then(mod => ({ default: mod.GitHubContributions }))
);
const BLUR_FADE_DELAY = 0.04;

export default function Page() {
  const githubUsername =
    DATA.contact.social?.GitHub?.url?.split("github.com/")[1]?.replace(/\/.*/, "") ||
    "priyanshuwq";

  const [githubTotal, setGithubTotal] = React.useState<number | null>(null);

  return (
    <main className="flex flex-col min-h-[100dvh] space-y-16 pt-8 sm:pt-0">
      <section id="hero">
        <div className="mx-auto w-full max-w-2xl">
          {/* Banner Image with Overlay Text - Hidden on mobile */}
          <BlurFade delay={BLUR_FADE_DELAY}>
            <div className="relative w-full h-40 sm:h-60 md:h-70 overflow-hidden bg-muted rounded-2xl">
              <Image
                src="/herosection/banner.jpeg"
                alt="Priyanshu Shekhar Singh - Full-Stack Developer Portfolio Banner"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover"
                priority
              />
              {/* Dark overlay */}
              <div className="absolute inset-0 bg-black/50" />

              {/* Lock In Text Overlay with improved styling */}
              <div className="absolute inset-0 flex items-center justify-center">
                <h2 className="text-lg sm:text-lg md:text-lg font-serif font-light text-white/60 ">
                  Written and Directed By
                </h2>
              </div>
            </div>
          </BlurFade>

          {/* Profile Section - Aligned to banner edges */}
          <div className="relative mx-auto w-full max-w-2xl">
            {/* Avatar - Aligned to left edge of banner */}
            <BlurFade delay={BLUR_FADE_DELAY * 1.5}>
              <div className="absolute left-0 -mt-8 sm:-mt-16 z-10">
                <div className="w-20 h-20 sm:w-32 sm:h-32 rounded-none drop-shadow-xl overflow-visible">
                  <PfpAvatar width={128} height={128} />
                </div>
              </div>
            </BlurFade>

            {/* Name & Title */}
            <div className="pt-14 sm:pt-20 mb-6">
              <BlurFade delay={BLUR_FADE_DELAY * 2}>
                <div className="space-y-0.5">
                  <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
                    {DATA.name}
                  </h1>
                  <AnimatedTitle />
                </div>
              </BlurFade>
            </div>

            {/* Introduction - Aligned to banner edges */}
            <BlurFade delay={BLUR_FADE_DELAY * 3}>
              <div className="space-y-6">
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  I turn ideas into interactive web experiences using{" "}
                  <Link
                    href="https://react.dev/"
                    target="_blank"
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 hover:bg-cyan-500/20 transition-colors font-medium"
                  >
                    <Icons.react className="size-3" />
                    React
                  </Link>
                  ,{" "}
                  <Link
                    href="https://nextjs.org/"
                    target="_blank"
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-foreground/10 hover:bg-foreground/20 transition-colors font-medium"
                  >
                    <Icons.nextjs className="size-3" />
                    Next.js
                  </Link>
                  ,{" "}
                  <Link
                    href="https://www.typescriptlang.org/"
                    target="_blank"
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-blue-500/10 text-blue-600 dark:text-blue-400 hover:bg-blue-500/20 transition-colors font-medium"
                  >
                    <Icons.typescript className="size-3" />
                    TypeScript
                  </Link>
                  , and{" "}
                  <Link
                    href="https://developer.mozilla.org/en-US/docs/Web/JavaScript"
                    target="_blank"
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 hover:bg-yellow-500/20 transition-colors font-medium"
                  >
                    <Icons.javascript className="size-3" />
                    JavaScript
                  </Link>
                  . I love playing with animations using{" "}
                  <Link
                    href="https://gsap.com/"
                    target="_blank"
                    className="font-medium text-foreground hover:text-green-500 transition-colors"
                  >
                    GSAP
                  </Link>
                  {" "}and{" "}
                  <Link
                    href="https://threejs.org/"
                    target="_blank"
                    className="font-medium text-foreground hover:text-blue-500 transition-colors"
                  >
                    Three.js
                  </Link>
                  . Always curious, always building.
                </p>
              </div>
            </BlurFade>

            {/* Buttons */}
            <BlurFade delay={BLUR_FADE_DELAY * 4}>
              <div className="flex flex-col gap-4 mt-6">
                <div className="flex gap-2">
                  <Link href="/resume/Priyanshu_Resume.pdf?v=2" target="_blank">
                    <Button variant="outline" className="gap-2 h-9 text-sm">
                      <FileText className="size-3.5" />
                      Resume / CV
                    </Button>
                  </Link>
                  <Link href="https://cal.com/priyanshuwq" target="_blank" rel="noopener noreferrer">
                    <Button className="gap-2 h-9 text-sm">
                      <CalendarDays className="size-3.5" />
                      Book a Call
                    </Button>
                  </Link>
                </div>

                {/* Social Icons */}
                <TooltipProvider>
                  <div className="flex flex-row gap-1">
                    {Object.entries(DATA.contact.social)
                      .filter(([_, social]) => social.navbar)
                      .map(([name, social]) => (
                        <Tooltip key={name}>
                          <TooltipTrigger asChild>
                            <Link
                              href={social.url}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <Button variant="ghost" size="icon" className="size-9 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">
                                {React.createElement(social.icon, {
                                  className: "size-[18px]",
                                })}
                              </Button>
                            </Link>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="font-medium">{name}</p>
                          </TooltipContent>
                        </Tooltip>
                      ))}
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Link
                          href={`mailto:${DATA.contact.email}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Button variant="ghost" size="icon" className="size-9 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">
                            {React.createElement(DATA.contact.social.email.icon, {
                              className: "size-[18px]",
                            })}
                          </Button>
                        </Link>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="font-medium">Email</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </TooltipProvider>
              </div>
            </BlurFade>
          </div>

          {/* Music Now Playing */}
          <BlurFade delay={BLUR_FADE_DELAY * 4.5}>
            <div className="mt-6">
              <MusicNowPlaying />
            </div>
          </BlurFade>
        </div>
      </section>
      <section id="projects">
        <div className="space-y-8 w-full py-8">
          <BlurFade delay={BLUR_FADE_DELAY * 11}>
            <div className="flex flex-col items-start space-y-2">
              <h3 className="text-sm font-medium text-muted-foreground">Featured</h3>
              <h2 className="text-3xl font-bold">Projects</h2>
            </div>
          </BlurFade>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 max-w-[800px] mx-auto">
            {DATA.projects.slice(0, 4).map((project, id) => (
              <BlurFade
                key={project.title}
                delay={BLUR_FADE_DELAY * 12 + id * 0.05}
              >
                <ProjectCard
                  key={project.title}
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
          <BlurFade delay={BLUR_FADE_DELAY * 13}>
            <div className="flex justify-center mt-4">
              <Link href="/projects">
                <Button variant="outline" className="gap-2">
                  Show all projects
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="size-4"
                  >
                    <path
                      fillRule="evenodd"
                      d="M2 10a.75.75 0 01.75-.75h12.59l-2.1-1.95a.75.75 0 111.02-1.1l3.5 3.25a.75.75 0 010 1.1l-3.5 3.25a.75.75 0 11-1.02-1.1l2.1-1.95H2.75A.75.75 0 012 10z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Button>
              </Link>
            </div>
          </BlurFade>
        </div>
      </section>

      {/* About Section */}
      <section id="about">
        <div className="space-y-8 w-full py-8">
          <BlurFade delay={BLUR_FADE_DELAY * 13.5}>
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-muted-foreground">About</h3>
              <h2 className="text-4xl font-bold">whoami</h2>
            </div>
          </BlurFade>

          <BlurFade delay={BLUR_FADE_DELAY * 14}>
            <div className="flex flex-col md:flex-row gap-8 items-start max-w-[800px] mx-auto">
              {/* Profile Image */}
              <div className="shrink-0 mx-auto md:mx-0">
                <div className="w-56 h-56 rounded-2xl overflow-visible relative">
                  <ParticleImage
                    src="/herosection/profile.svg"
                    width={224}
                    height={224}
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>

              {/* whoami */}
              <div className="flex-1 space-y-4">
                <div>
                  <h3 className="text-2xl mb-3">Priyanshu Shekhar Singh</h3>
                  <div className="space-y-3 text-muted-foreground text-sm leading-relaxed">
                    <p>
                      Full-Stack Web Developer and open-source contributor building clean, user-friendly interfaces. I follow one rule: make every project better than the last.
                    </p>
                    <p>
                      Participated in Smart India Hackathon — learned teamwork, coordination, and growth through challenges. I believe in building in public and learning through consistency.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </BlurFade>

          {/* Tools Marquee */}
          <BlurFade delay={BLUR_FADE_DELAY * 14.5}>
            <div className="max-w-[800px] mx-auto mt-8">
              <ToolsMarquee />
            </div>
          </BlurFade>
        </div>
      </section>

      <section id="github">
        <div className="space-y-3 w-full py-8">
          <BlurFade delay={BLUR_FADE_DELAY * 15}>

            <div className="space-y-1">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Featured</h3>
                <h2 className="text-xl font-bold">GitHub Activity</h2>
              </div>
              <div className="text-sm text-muted-foreground">
                Total: <span className="font-semibold text-foreground">{githubTotal ?? '...'}</span> contributions
              </div>
            </div>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 16}>
            <Suspense fallback={
              <div className="relative w-full overflow-x-auto overflow-y-hidden rounded-lg border bg-card p-4">
                <div className="flex h-32 items-center justify-center text-sm text-muted-foreground">
                  Loading contribution data…
                </div>
              </div>
            }>
              <GitHubContributions username={githubUsername} onTotalLoad={setGithubTotal} />
            </Suspense>
          </BlurFade>
        </div>
      </section>

      {/* Blog Section */}
      <section id="blogs">
        <div className="space-y-6 w-full">
          <BlurFade delay={BLUR_FADE_DELAY * 17}>
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h3 className="text-sm font-medium text-muted-foreground">Featured</h3>
                <h2 className="text-xl font-bold">Blogs</h2>
              </div>
              <Button variant="outline" asChild size="sm">
                <Link href="/blogs">
                  View All
                </Link>
              </Button>
            </div>
          </BlurFade>

          <div className="divide-y divide-border/50 rounded-lg border border-border/40 overflow-hidden">
            {DATA.blogs.slice(0, 4).map((blog, id) => (
              <BlurFade key={blog.title} delay={BLUR_FADE_DELAY * 18 + id * 0.05}>
                {blog.href ? (
                  <Link href={blog.href} target="_blank" className="group flex items-start justify-between gap-4 px-4 py-3.5 hover:bg-muted/40 transition-colors">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground/90 group-hover:text-foreground leading-snug mb-0.5">{blog.title}</p>
                      <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">{blog.description}</p>
                    </div>
                    <span className="text-xs text-muted-foreground shrink-0 pt-0.5 tabular-nums">{blog.date}</span>
                  </Link>
                ) : (
                  <div className="flex items-start justify-between gap-4 px-4 py-3.5 opacity-60">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground/90 leading-snug mb-0.5">{blog.title}</p>
                      <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">{blog.description}</p>
                    </div>
                    {blog.status === "upcoming" ? (
                      <span className="shrink-0 pt-0.5 text-[10px] font-medium border border-dashed border-border rounded-full px-2.5 py-0.5 text-muted-foreground tracking-wide uppercase whitespace-nowrap">
                        Coming soon
                      </span>
                    ) : (
                      <span className="text-xs text-muted-foreground shrink-0 pt-0.5 tabular-nums">{blog.date}</span>
                    )}
                  </div>
                )}
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      <ContactSection />



    </main>
  );
}
