import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { Calendar } from "lucide-react";

interface Props {
  title: string;
  href?: string;
  description: string;
  date: string;
  tags?: readonly string[];
  image?: string;
  className?: string;
  status?: "upcoming" | "published";
}

export function BlogCard({
  title,
  href,
  description,
  date,
  tags,
  image,
  className,
  status = "published",
}: Props) {
  const CardWrapper = href ? Link : "div";
  
  return (
    <CardWrapper
      href={href || "#"}
      className={cn(
        "block group",
        href && "cursor-pointer",
        className
      )}
    >
      <Card className="h-full overflow-hidden border hover:border-primary/50 transition-all duration-300 flex flex-col">
        {image && (
          <div className="relative w-full h-56 overflow-hidden bg-muted">
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            {status === "upcoming" && (
              <div className="absolute top-3 right-3">
                <Badge className="bg-primary/90 text-primary-foreground backdrop-blur-sm">
                  Upcoming
                </Badge>
              </div>
            )}
          </div>
        )}
        <CardHeader className="pb-3 px-6 pt-6">
          <div className="space-y-2.5">
            <CardTitle className="text-foreground group-hover:text-primary transition-colors text-xl leading-tight">
              {title}
            </CardTitle>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Calendar className="size-3.5" />
              <time dateTime={date}>{date}</time>
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col px-6 pt-0 pb-6">
          <p className="text-sm text-muted-foreground mb-auto leading-relaxed">
            {description}
          </p>
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-4 pt-4 border-t border-border/40">
              {tags.map((tag, idx) => (
                <Badge key={idx} variant="secondary" className="text-xs px-2.5 py-1">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </CardWrapper>
  );
}
