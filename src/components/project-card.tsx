import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Icons } from "@/components/icons";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import Markdown from "react-markdown";

interface Props {
  title: string;
  href?: string;
  description: string;
  dates: string;
  tags: readonly string[];
  link?: string;
  image?: string;
  video?: string;
  links?: readonly {
    icon: React.ReactNode;
    type: string;
    href: string;
  }[];
  className?: string;
  active?: boolean;
  slug?: string;
}

// Tech icon mapper
const TechIcon = ({ tech }: { tech: string }) => {
  const iconProps = { className: "size-5" };
  
  // Normalize the tech name for matching
  const normalizedTech = tech.toLowerCase().replace(/\s+/g, '').replace(/\./g, '');
  
  switch (normalizedTech) {
    case "react":
      return <Icons.react {...iconProps} />;
    case "nextjs":
      return <Icons.nextjs {...iconProps} />;
    case "typescript":
      return <Icons.typescript {...iconProps} />;
    case "javascript":
      return <Icons.javascript {...iconProps} />;
    case "nodejs":
      return <Icons.nodejs {...iconProps} />;
    case "tailwindcss":
      return <Icons.tailwindcss {...iconProps} />;
    case "postgresql":
    case "postgres":
      return <Icons.postgresql {...iconProps} />;
    case "prisma":
      return <Icons.prisma {...iconProps} />;
    case "stripe":
      return <Icons.stripe {...iconProps} />;
    case "mongodb":
      return <Icons.mongodb {...iconProps} />;
    case "cloudinary":
      return <Icons.Cloudinary {...iconProps} />;
    case "clerk":
      return <Icons.clerk {...iconProps} />;
    case "webrtc":
      return <Icons.webrtc {...iconProps} />;
    case "render":
      return <Icons.render {...iconProps} />;
    case "socketio":
      return <Icons.socketio {...iconProps} />;
    case "vercel":
      return <Icons.vercel {...iconProps} />;
    case "threejs":
      return <Icons.threejs {...iconProps} />;
    case "gsap":
      return <Icons.gsap {...iconProps} />;
    case "shadcnui":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24" {...iconProps}>
          <path d="m19.01 11.55-7.46 7.46c-.46.46-.46 1.19 0 1.65a1.16 1.16 0 0 0 1.64 0l7.46-7.46c.46-.46.46-1.19 0-1.65s-1.19-.46-1.65 0ZM19.17 3.34c-.46-.46-1.19-.46-1.65 0L3.34 17.52c-.46.46-.46 1.19 0 1.65a1.16 1.16 0 0 0 1.64 0L19.16 4.99c.46-.46.46-1.19 0-1.65Z"/>
        </svg>
      );
    case "magicui":
      return (
        <svg viewBox="0 0 256 256" {...iconProps}>
          <path fill="currentColor" d="M128 16a12 12 0 0 1 12 12v20a12 12 0 0 1-24 0V28a12 12 0 0 1 12-12zm101.66 58.34a12 12 0 0 1 0 17l-14.14 14.15a12 12 0 0 1-17-17l14.14-14.15a12 12 0 0 1 17 0zM240 116h-20a12 12 0 0 0 0 24h20a12 12 0 0 0 0-24zm-35.75 73.76a12 12 0 1 0 17 17l14.14-14.15a12 12 0 0 0-17-17zM128 196a12 12 0 0 0-12 12v20a12 12 0 0 0 24 0v-20a12 12 0 0 0-12-12zm-74.34-16.49l-14.15 14.14a12 12 0 0 0 17 17l14.15-14.14a12 12 0 0 0-17-17zM48 128a12 12 0 0 0-12-12H16a12 12 0 0 0 0 24h20a12 12 0 0 0 12-12zm-1.17-70.83a12 12 0 1 0-17 17l14.14 14.14a12 12 0 0 0 17-17z"/>
        </svg>
      );
    case "cloudflareworkers":
      return (
        <svg viewBox="0 0 256 256" {...iconProps}>
          <path fill="#F38020" d="M207.285 145.831c-1.419-4.093-5.23-7.094-9.549-7.524-.957-.095-1.92-.095-2.878 0-11.976.48-22.444 8.446-26.413 20.095-1.915 5.616-7.15 9.455-13.086 9.597-6.931.142-13.86.019-20.79.057-.957 0-1.915.038-2.872.095-8.068.427-15.375 4.28-20.172 10.63-3.495 4.625-5.267 10.25-5.23 16.01 0 1.2.095 2.4.286 3.588H10.286C4.59 198.378 0 193.788 0 188.091V94.606c0-5.696 4.59-10.287 10.286-10.287h195.428c5.696 0 10.286 4.59 10.286 10.287v51.225z"/>
        </svg>
      );
    default:
      // Return a default placeholder or null
      return (
        <div className={iconProps.className} title={tech}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"/>
            <path d="M12 6v6l4 2"/>
          </svg>
        </div>
      );
  }
};

export function ProjectCard({
  title,
  href,
  description,
  dates,
  tags,
  link,
  image,
  video,
  links,
  className,
  active = true,
  slug,
}: Props) {
  return (
    <Card
      className={
        "group flex flex-col overflow-hidden border border-border/50 hover:border-border hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 ease-out h-full bg-card/50 backdrop-blur-sm"
      }
    >
      {/* Image/Video Container */}
      <div className={cn("block cursor-default overflow-hidden relative", className)}>
        <div className="relative w-full aspect-video overflow-hidden bg-gradient-to-br from-muted/80 to-muted/40">
          {video && (
            <video
              src={video}
              autoPlay
              loop
              muted
              playsInline
              className="pointer-events-none absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
            />
          )}
          {image && (
            <Image
              src={image}
              alt={title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
              quality={90}
              priority={false}
            />
          )}
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
        </div>
      </div>
      
      <CardHeader className="px-5 pt-5 pb-3 space-y-3">
        <div className="flex items-start justify-between gap-3">
          <CardTitle className="text-xl font-bold leading-tight tracking-tight group-hover:text-primary transition-colors duration-300">
            {title}
          </CardTitle>
          {links && links.length > 0 && (
            <div className="flex items-center gap-1.5 flex-shrink-0">
              {links?.map((link, idx) => (
                <Link 
                  href={link?.href} 
                  key={idx} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-200"
                >
                  {link.icon}
                </Link>
              ))}
            </div>
          )}
        </div>
        <Markdown className="prose prose-sm max-w-full text-pretty font-sans text-muted-foreground/90 dark:prose-invert line-clamp-3 leading-relaxed">
          {description}
        </Markdown>
      </CardHeader>
      
      <CardContent className="px-5 pb-5 mt-auto space-y-4">
        {tags && tags.length > 0 && (
          <div>
            <p className="text-xs text-muted-foreground mb-2">Technologies</p>
            <TooltipProvider>
              <div className="flex flex-wrap gap-2.5">
                {tags?.map((tag) => (
                  <Tooltip key={tag}>
                    <TooltipTrigger asChild>
                      <div className="flex items-center justify-center transition-all duration-300 hover:scale-110 cursor-pointer">
                        <TechIcon tech={tag} />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent className="bg-white text-black border border-gray-200 shadow-lg">
                      <p className="font-medium">{tag}</p>
                    </TooltipContent>
                  </Tooltip>
                ))}
              </div>
            </TooltipProvider>
          </div>
        )}
        
        {/* Bottom section with status and View Details */}
        <div className="flex items-center justify-between pt-3 border-t border-border/30">
          <div className="flex items-center gap-2">
            {active ? (
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                <div className="size-1.5 rounded-full bg-emerald-500 animate-pulse shadow-lg shadow-emerald-500/50" />
                <span className="text-[10px] font-semibold tracking-wide uppercase text-emerald-700 dark:text-emerald-400">
                  Live
                </span>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-orange-500/10 border border-orange-500/20">
                <div className="size-1.5 rounded-full bg-orange-500 animate-pulse shadow-lg shadow-orange-500/50" />
                <span className="text-[10px] font-semibold tracking-wide uppercase text-orange-700 dark:text-orange-400">
                  Building
                </span>
              </div>
            )}
          </div>
          
          {slug ? (
            <Link 
              href={`/projects/${slug}`}
              className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              <span className="font-medium">View Details</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </Link>
          ) : (
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <span className="font-medium">In Progress</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
