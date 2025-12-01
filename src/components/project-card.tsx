import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Icons } from "@/components/icons";
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
      return <Icons.cloudinary {...iconProps} />;
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
    case "shadcnui":
      return (
        <svg viewBox="0 0 256 256" {...iconProps}>
          <rect width="256" height="256" fill="none"/>
          <line x1="208" y1="128" x2="128" y2="208" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"/>
          <line x1="192" y1="40" x2="40" y2="192" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"/>
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
          <CardTitle className="text-xl font-bold flex-1 leading-tight tracking-tight group-hover:text-primary transition-colors duration-300">
            {title}
          </CardTitle>
          <div className="flex items-center gap-2 flex-shrink-0">
            {active && (
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 backdrop-blur-sm">
                <div className="size-1.5 rounded-full bg-emerald-500 animate-pulse shadow-lg shadow-emerald-500/50" />
                <span className="text-[10px] font-semibold tracking-wide uppercase text-emerald-700 dark:text-emerald-400">
                  Live
                </span>
              </div>
            )}
            {links && links.length > 0 && (
              <div className="flex items-center gap-1.5">
                {links?.map((link, idx) => (
                  <Link 
                    href={link?.href} 
                    key={idx} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all duration-200"
                  >
                    {link.icon}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
        <Markdown className="prose prose-sm max-w-full text-pretty font-sans text-muted-foreground/90 dark:prose-invert line-clamp-3 leading-relaxed">
          {description}
        </Markdown>
      </CardHeader>
      
      <CardContent className="px-5 pb-5 mt-auto space-y-4">
        {tags && tags.length > 0 && (
          <div>
            <p className="text-xs text-muted-foreground mb-2">Technologies</p>
            <div className="flex flex-wrap gap-3">
              {tags?.map((tag) => (
                <div
                  key={tag}
                  className="flex items-center justify-center transition-all duration-300 hover:scale-110"
                  title={tag}
                >
                  <TechIcon tech={tag} />
                </div>
              ))}
            </div>
          </div>
        )}
        {dates && (
          <div className="flex items-center gap-2 pt-2 border-t border-border/30">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-3.5 text-muted-foreground/70"
            >
              <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
              <line x1="16" x2="16" y1="2" y2="6" />
              <line x1="8" x2="8" y1="2" y2="6" />
              <line x1="3" x2="21" y1="10" y2="10" />
            </svg>
            <span className="text-xs text-muted-foreground/80 font-medium">{dates}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
