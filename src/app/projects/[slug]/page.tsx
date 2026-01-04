import { DATA } from "@/data/resume";
import { projectContent } from "@/data/projects";
import { notFound } from "next/navigation";
import BlurFade from "@/components/magicui/blur-fade";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, ExternalLink, Github, Check } from "lucide-react";

const BLUR_FADE_DELAY = 0.04;

// Generate static paths for all projects
export async function generateStaticParams() {
  return DATA.projects.map((project) => ({
    slug: project.slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params;
  const project = DATA.projects.find((p) => p.slug === slug);
  
  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: `${project.title} - ${DATA.name}`,
    description: project.description,
  };
}

export default async function ProjectPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params;
  const project = DATA.projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  const content = projectContent[slug];

  // Find related projects (same technologies, exclude current project)
  const relatedProjects = DATA.projects
    .filter((p) => p.slug !== project.slug && p.slug)
    .filter((p) => 
      p.technologies.some((tech) => 
        (project.technologies as readonly string[]).includes(tech)
      )
    )
    .slice(0, 2);

  return (
    <main className="flex flex-col min-h-screen pt-8 sm:pt-12">
      <div className="w-full space-y-8">
        {/* Back Button */}
        <BlurFade delay={BLUR_FADE_DELAY}>
          <Link href="/projects" className="inline-flex items-center text-sm hover:underline">
            <ArrowLeft className="mr-2 size-4" />
            Back to Projects
          </Link>
        </BlurFade>

        {/* Project Hero */}
        <BlurFade delay={BLUR_FADE_DELAY * 2}>
          <div className="space-y-4">
            {/* Status Badge */}
            {(project as any).status ? (
              <Badge variant="outline" className={(project as any).status === 'Building' ? 'border-yellow-500 text-yellow-500' : ''}>
                {(project as any).status}
              </Badge>
            ) : project.active ? (
              <Badge variant="outline" className="border-green-500 text-green-500">
                {project.dates.toLowerCase().includes('present') ? 'Active' : 'Completed'}
              </Badge>
            ) : (
              <Badge variant="outline">
                Completed
              </Badge>
            )}

            {/* Title */}
            <h1 className="text-4xl font-bold">{project.title}</h1>

            {/* Description */}
            <p className="text-lg text-muted-foreground">{project.description}</p>

            {/* Project Metadata */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
              <div>
                <p className="text-sm text-muted-foreground">Timeline</p>
                <p className="font-medium">{project.dates || "Ongoing"}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Role</p>
                <p className="font-medium">Full Stack</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Team</p>
                <p className="font-medium">Solo</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Status</p>
                <p className="font-medium">{(project as any).status || (project.active ? 'Active' : 'Completed')}</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 pt-2">
              {project.links?.map((link, idx) => (
                <Button key={idx} asChild variant="default" size="sm">
                  <Link href={link.href} target="_blank" rel="noopener noreferrer">
                    {link.type === "Website" && <ExternalLink className="mr-2 size-4" />}
                    {link.type === "Source" && <Github className="mr-2 size-4" />}
                    {link.type === "Website" ? "Live Demo" : "Source Code"}
                  </Link>
                </Button>
              ))}
            </div>
          </div>
        </BlurFade>

        {/* Project Media */}
        {(project.video || project.image) && (
          <BlurFade delay={BLUR_FADE_DELAY * 3}>
            <div className="relative w-full aspect-video rounded-lg overflow-hidden border bg-card">
              {project.video ? (
                <video
                  src={project.video}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="object-cover w-full h-full"
                />
              ) : project.image ? (
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover"
                />
              ) : null}
            </div>
          </BlurFade>
        )}

        {/* Project Overview Section */}
        <BlurFade delay={BLUR_FADE_DELAY * 4}>
          <Card>
            <CardContent className="pt-6 space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-4">Overview</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {content?.overview || project.description}
                </p>
              </div>

              {/* Highlights */}
              {content?.highlights && content.highlights.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-3">Highlights</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {content.highlights.map((highlight, idx) => (
                      <div key={idx} className="flex items-start gap-2 p-3 rounded-lg bg-muted/50">
                        <Check className="size-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Features */}
              {content?.features && content.features.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-3">Key Features</h3>
                  <ul className="space-y-2">
                    {content.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <Check className="size-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>
        </BlurFade>

        {/* Tech Stack Section */}
        <BlurFade delay={BLUR_FADE_DELAY * 5}>
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-2xl font-bold mb-4">Tech Stack</h2>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, idx) => (
                  <Badge key={idx} variant="secondary">
                    {tech}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </BlurFade>

        {/* Related Projects Section */}
        {relatedProjects.length > 0 && (
          <BlurFade delay={BLUR_FADE_DELAY * 6}>
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Related Projects</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {relatedProjects.map((relatedProject, idx) => (
                  <Link
                    key={idx}
                    href={`/projects/${relatedProject.slug}`}
                    className="block group"
                  >
                    <Card className="h-full rounded-xl border-2 hover:border-primary transition-colors">
                      <CardContent className="p-6">
                        <div className="space-y-2">
                          <div className="flex items-start justify-between">
                            <h3 className="font-bold group-hover:underline">
                              {relatedProject.title}
                            </h3>
                            {relatedProject.active && (
                              <Badge variant="outline" className="text-xs">
                                Active
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {relatedProject.description}
                          </p>
                          <div className="flex flex-wrap gap-1 pt-2">
                            {relatedProject.technologies.slice(0, 3).map((tech, techIdx) => (
                              <Badge key={techIdx} variant="secondary" className="text-xs">
                                {tech}
                              </Badge>
                            ))}
                            {relatedProject.technologies.length > 3 && (
                              <Badge variant="secondary" className="text-xs">
                                +{relatedProject.technologies.length - 3}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </BlurFade>
        )}

        {/* View All Projects Button */}
        <BlurFade delay={BLUR_FADE_DELAY * 7}>
          <div className="flex justify-center pt-4">
            <Button asChild variant="outline">
              <Link href="/projects">
                View All Projects
              </Link>
            </Button>
          </div>
        </BlurFade>
      </div>
    </main>
  );
}
