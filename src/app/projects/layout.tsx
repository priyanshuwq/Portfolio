import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects | Shekhr Dev - Priyanshu Shekhar Singh",
  description: "Explore web development projects built by Priyanshu Shekhar Singh (Shekhr Dev). Full-stack applications featuring React, Next.js, TypeScript, Node.js, MongoDB, real-time features with WebRTC and Socket.io, and stunning animations with GSAP and Three.js.",
  keywords: [
    "Priyanshu Shekhar Singh Projects",
    "Shekhr Dev Portfolio",
    "Web Development Projects",
    "React Projects",
    "Next.js Portfolio",
    "Full-Stack Projects",
    "TypeScript Applications",
    "Interactive Web Experiences",
    "Real-time Web Apps",
    "MERN Stack Projects",
  ],
  openGraph: {
    title: "Projects | Shekhr Dev Portfolio",
    description: "Explore web development projects by Priyanshu Shekhar Singh featuring modern tech stacks including React, Next.js, TypeScript, and more.",
    url: "https://shekhr.dev/projects",
    siteName: "Shekhr Dev Portfolio",
    type: "website",
    images: [
      {
        url: "/herosection/preview.png",
        width: 1200,
        height: 630,
        alt: "Shekhr Dev Projects Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects | Shekhr Dev Portfolio",
    description: "Explore web development projects by Priyanshu Shekhar Singh",
    creator: "@priyanshuwq",
    images: ["/herosection/preview.png"],
  },
  alternates: {
    canonical: "https://shekhr.dev/projects",
  },
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
