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
}

// Tech icon mapper
const TechIcon = ({ tech }: { tech: string }) => {
  const iconProps = { className: "size-5" };
  
  // Normalize the tech name for matching
  const normalizedTech = tech.toLowerCase().replace(/\s+/g, '').replace('.', '');
  
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
      return null;
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
}: Props) {
  return (
    <Card
      className={
        "flex flex-col overflow-hidden border hover:shadow-lg transition-all duration-300 ease-out h-full bg-card"
      }
    >
      <Link
        href={href || "#"}
        className={cn("block cursor-pointer overflow-hidden", className)}
      >
        <div className="relative w-full aspect-video overflow-hidden bg-muted">
          {video && (
            <video
              src={video}
              autoPlay
              loop
              muted
              playsInline
              className="pointer-events-none absolute inset-0 w-full h-full object-cover object-center"
            />
          )}
          {image && (
            <Image
              src={image}
              alt={title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover object-center"
              quality={90}
              priority={false}
            />
          )}
        </div>
      </Link>
      <CardHeader className="px-4 pt-4 pb-3">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold">{title}</CardTitle>
            {links && links.length > 0 && (
              <div className="flex gap-2">
                {links?.map((link, idx) => (
                  <Link href={link?.href} key={idx} target="_blank">
                    <div className="text-muted-foreground hover:text-foreground transition-colors">
                      {link.icon}
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
          <Markdown className="prose prose-sm max-w-full text-pretty font-sans text-muted-foreground dark:prose-invert line-clamp-2">
            {description}
          </Markdown>
        </div>
      </CardHeader>
      <CardContent className="px-4 pb-4 mt-auto">
        {tags && tags.length > 0 && (
          <div>
            <p className="text-xs text-muted-foreground mb-2">Technologies</p>
            <div className="flex flex-wrap gap-2">
              {tags?.map((tag) => (
                <div
                  key={tag}
                  className="flex items-center justify-center"
                  title={tag}
                >
                  <TechIcon tech={tag} />
                </div>
              ))}
            </div>
          </div>
        )}
        {dates && (
          <div className="flex items-center gap-1 mt-3 text-xs text-muted-foreground">
            <div className="size-1.5 rounded-full bg-green-500" />
            <span>{dates}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
