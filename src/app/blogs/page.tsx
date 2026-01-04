import BlurFade from "@/components/magicui/blur-fade";
import { BlogCard } from "@/components/blog-card";

const BLUR_FADE_DELAY = 0.04;

const blogPosts = [
  {
    title: "WebRTC",
    description: "Understanding WebRTC fundamentals, peer-to-peer communication, and building real-time applications.",
    date: "Coming Soon",
    tags: ["WebRTC", "JavaScript", "Real-time"],
    image: "/blog/webrtc.png",
    status: "upcoming" as const,
  },
];

export default function BlogPage() {
  return (
    <main className="flex min-h-screen flex-col items-center pt-8 sm:pt-12">
      <div className="w-full space-y-8">
        {/* Header */}
        <BlurFade delay={BLUR_FADE_DELAY}>
          <div className="flex flex-col items-center text-center space-y-3 border-b border-border pb-6">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
              Blogs
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Thoughts, tutorials, and insights on engineering and programming.
            </p>
          </div>
        </BlurFade>

        {/* Blog Posts Grid */}
        <BlurFade delay={BLUR_FADE_DELAY * 2}>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">
                Latest Posts{" "}
                <span className="text-muted-foreground text-sm">
                  ({blogPosts.length} {blogPosts.length === 1 ? "post" : "posts"})
                </span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {blogPosts.map((post, id) => (
                <BlurFade key={post.title} delay={BLUR_FADE_DELAY * 3 + id * 0.05}>
                  <BlogCard
                    title={post.title}
                    description={post.description}
                    date={post.date}
                    tags={post.tags}
                    image={post.image}
                    status={post.status}
                  />
                </BlurFade>
              ))}
            </div>
          </div>
        </BlurFade>
      </div>
    </main>
  );
}
