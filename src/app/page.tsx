"use client";

import BlurFade from "@/components/magicui/blur-fade";
import BlurFadeText from "@/components/magicui/blur-fade-text";
import { ProjectCard } from "@/components/project-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { DATA } from "@/data/resume";
import { FileText, Send } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import React, { Suspense, lazy } from "react";
import { Card } from "@/components/ui/card";
import { SkillIcon } from "@/components/skill-icons";
import { SpotifyNowPlaying } from "@/components/spotify-now-playing";

const GitHubContributions = lazy(() => 
  import("@/components/github-contributions").then(mod => ({ default: mod.GitHubContributions }))
);

const BLUR_FADE_DELAY = 0.04;

export default function Page() {
  const githubUsername =
    DATA.contact.social?.GitHub?.url?.split("github.com/")[1]?.replace(/\/.*/, "") ||
    "priyanshuwq";

  return (
    <main className="flex flex-col min-h-[100dvh] space-y-16">
      <section id="hero">
        <div className="mx-auto w-full max-w-2xl">
          {/* Banner Image with Overlay Text */}
          <BlurFade delay={BLUR_FADE_DELAY}>
            <div className="relative w-full h-56 sm:h-64 md:h-72 overflow-hidden bg-muted">
              <Image
                src="/Banner.jpeg"
                alt="Profile Banner"
                fill
                className="object-cover"
                priority
              />
              {/* Dark overlay */}
              <div className="absolute inset-0 bg-black/40" />
              
              {/* Lock In Text Overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <h2 className="text-5xl sm:text-6xl md:text-7xl font-serif font-light tracking-wide text-white/30 mix-blend-soft-light">
                  Lock In
                </h2>
              </div>
            </div>
          </BlurFade>

          {/* Profile Section */}
          <div className="relative mx-auto w-full max-w-2xl px-4 sm:px-6">
            {/* Avatar */}
            <BlurFade delay={BLUR_FADE_DELAY * 1.5}>
              <div className="-mt-12 sm:-mt-16 mb-4">
                <Avatar className="w-24 h-24 sm:w-32 sm:h-32 border-4 border-background shadow-xl">
                  <AvatarImage alt={DATA.name} src={DATA.avatarUrl} />
                  <AvatarFallback>
                    {DATA.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </div>
            </BlurFade>

            {/* Name, Title, and Social Icons Row */}
            <div className="flex items-start justify-between mb-6">
              {/* Name and Title */}
              <BlurFade delay={BLUR_FADE_DELAY * 2}>
                <div className="space-y-0.5">
                  <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
                    {DATA.name}
                  </h1>
                  <p className="text-sm sm:text-base text-muted-foreground">
                    FullStack Developer
                  </p>
                </div>
              </BlurFade>

              {/* Social Icons */}
              <BlurFade delay={BLUR_FADE_DELAY * 2.5}>
                <div className="flex flex-row gap-0 -mr-2">
                  {Object.entries(DATA.contact.social)
                    .filter(([_, social]) => social.navbar)
                    .map(([name, social]) => (
                      <Link
                        key={name}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button variant="ghost" size="icon" className="size-8 rounded-lg hover:bg-muted">
                          {React.createElement(social.icon, {
                            className: "size-4",
                          })}
                        </Button>
                      </Link>
                    ))}
                  <Link
                    href={`mailto:${DATA.contact.email}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="ghost" size="icon" className="size-8 rounded-lg hover:bg-muted">
                      {React.createElement(DATA.contact.social.email.icon, {
                        className: "size-4",
                      })}
                    </Button>
                  </Link>
                </div>
              </BlurFade>
            </div>

            {/* Introduction */}
            <BlurFade delay={BLUR_FADE_DELAY * 3}>
              <div className="space-y-4">
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
              <div className="flex flex-col gap-2 mt-6">
                <div className="flex gap-2">
                  <Link href="/MyResume.pdf" target="_blank">
                    <Button variant="outline" className="gap-2 h-9 text-sm">
                      <FileText className="size-3.5" />
                      Resume / CV
                    </Button>
                  </Link>
                  <Link href="#contact">
                    <Button className="gap-2 h-9 text-sm">
                      <Send className="size-3.5" />
                      Contact
                    </Button>
                  </Link>
                </div>
                <SpotifyNowPlaying />
              </div>
            </BlurFade>
          </div>
        </div>
      </section>
      <section id="projects">
        <div className="space-y-12 w-full py-12">
          <BlurFade delay={BLUR_FADE_DELAY * 11}>
            <div className="flex flex-col items-start space-y-4">
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
                />
              </BlurFade>
            ))}
          </div>
          <BlurFade delay={BLUR_FADE_DELAY * 13}>
            <div className="flex justify-center mt-8">
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
      <section id="github">
        <BlurFade delay={BLUR_FADE_DELAY * 13}>
          <Suspense fallback={
            <div className="space-y-4">
              <div>
                <h2 className="text-3xl font-bold">GitHub Contributions</h2>
                <p className="text-muted-foreground">
                  A snapshot of the past year of commits and green squares.
                </p>
              </div>
              <div className="relative w-full overflow-x-auto overflow-y-hidden rounded-2xl border bg-card/60 p-4">
                <div className="flex h-48 items-center justify-center text-sm text-muted-foreground">
                  Loading contribution data…
                </div>
              </div>
            </div>
          }>
            <GitHubContributions username={githubUsername} />
          </Suspense>
        </BlurFade>
      </section>
      <section id="skills">
        <div className="flex min-h-0 flex-col gap-y-3">
          <BlurFade delay={BLUR_FADE_DELAY * 14}>
            <h2 className="text-xl font-bold">Skills</h2>
          </BlurFade>
          <div className="flex flex-wrap gap-3">
            {DATA.skills.map((skill, id) => (
              <BlurFade key={skill} delay={BLUR_FADE_DELAY * 15 + id * 0.05}>
                <div
                  className="group relative flex items-center justify-center w-14 h-14 transition-all duration-300 hover:scale-110"
                  title={skill}
                >
                  <SkillIcon skill={skill} />
                </div>
              </BlurFade>
            ))}
          </div>
        </div>
        <BlurFade delay={BLUR_FADE_DELAY * 15.5}>
          <div className="mt-8 rounded-xl overflow-hidden border border-black/10 dark:border-white/10 shadow-lg">
            <iframe
              src="https://open.spotify.com/embed/playlist/62767ucbiIBcDMOIxSNwjB?utm_source=generator&theme=0"
              width="100%"
              height="152"
              frameBorder="0"
              allowFullScreen
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              style={{ borderRadius: '12px' }}
            />
          </div>
        </BlurFade>
      </section>
      <section id="contact">
        <div className="flex flex-col gap-4 w-full py-12">
          <BlurFade delay={BLUR_FADE_DELAY * 16}>
            <div className="space-y-3">
              <h2 className="text-3xl font-bold">Contact</h2>
              <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Get in touch with me. I will get back to you as soon as possible.
              </p>
            </div>
          </BlurFade>
          
          <BlurFade delay={BLUR_FADE_DELAY * 17}>
            <div className="border-t border-border pt-8 mt-4">
              <div className="space-y-3 mb-6">
                <h3 className="text-xl font-bold">Send me a message</h3>
                <p className="text-sm text-muted-foreground">
                  Fill out the form below and I will get back to you as soon as possible.
                </p>
              </div>
              
              <Card className="p-6 border-2">
                <form 
                  action={`mailto:${DATA.contact.email}`}
                  method="post"
                  encType="text/plain"
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label 
                        htmlFor="name" 
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Name <span className="text-destructive">*</span>
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        placeholder="Your full name"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label 
                        htmlFor="email" 
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Email <span className="text-destructive">*</span>
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        placeholder="your.email@example.com"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label 
                      htmlFor="message" 
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Message <span className="text-destructive">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      placeholder="Tell me about your project or just say hello..."
                      className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="gap-2"
                  >
                    <Send className="size-4" />
                    Send Message
                  </Button>
                </form>
              </Card>
            </div>
          </BlurFade>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-12 mt-16 border-t">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <BlurFade delay={BLUR_FADE_DELAY * 16}>
            <div className="flex flex-col items-center gap-6">
              {/* Visitor Stats */}
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-muted/50">
                  <Icons.eye className="size-4" />
                  <span>You are the <span className="font-semibold text-foreground">visitor</span></span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-muted/50">
                  <Icons.activity className="size-4" />
                  <span className="font-semibold text-foreground">total visits</span>
                </div>
              </div>

              {/* Copyright */}
              <div className="text-center space-y-1">
                <p className="text-sm text-muted-foreground">
                  Design & Developed by <span className="font-semibold text-foreground">{DATA.name}</span>
                </p>
                <p className="text-xs text-muted-foreground">
                  © {new Date().getFullYear()}. All rights reserved.
                </p>
              </div>
            </div>
          </BlurFade>
        </div>
      </footer>
    </main>
  );
}
