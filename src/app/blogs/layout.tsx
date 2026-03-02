import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | Shekhr Dev - Priyanshu Shekhar Singh",
  description: "Read blog posts and articles about web development, programming insights, and technical tutorials by Priyanshu Shekhar Singh (Shekhr Dev). Topics include React, Next.js, TypeScript, JavaScript, Node.js, and modern web development best practices.",
  keywords: [
    "Priyanshu Shekhar Singh Blog",
    "Shekhr Dev Blog",
    "Web Development Blog",
    "React Tutorial",
    "Next.js Articles",
    "TypeScript Guide",
    "JavaScript Tips",
    "Programming Blog",
    "Full-Stack Development",
    "Tech Blog India",
  ],
  openGraph: {
    title: "Blog | Shekhr Dev",
    description: "Web development insights, tutorials, and technical articles by Priyanshu Shekhar Singh",
    url: "https://shekhr.dev/blogs",
    siteName: "Shekhr Dev Portfolio",
    type: "website",
    images: [
      {
        url: "/herosection/preview.png",
        width: 1200,
        height: 630,
        alt: "Shekhr Dev Blog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | Shekhr Dev",
    description: "Web development insights and tutorials by Priyanshu Shekhar Singh",
    creator: "@priyanshuwq",
    images: ["/herosection/preview.png"],
  },
  alternates: {
    canonical: "https://shekhr.dev/blogs",
  },
};

export default function BlogsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
