import { Icons } from "@/components/icons";
import { HomeIcon } from "lucide-react";

export const DATA = {
  name: "Priyanshu",
  avatarUrl: "./profile.png",
  skills: [
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "JavaScript",
    "MongoDB",
  ],
  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
    { href: "/projects", icon: HomeIcon, label: "Projects" },
  ],
  contact: {
    email: "priyanshuofficial2004@gmail.com",
    tel: "",
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/priyanshuwq",
        icon: Icons.github,

        navbar: true,
      },
      LinkedIn: {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/priyanshuwq",
        icon: Icons.linkedin,

        navbar: true,
      },
      X: {
        name: "X",
        url: "https://x.com/priyanshuwq",
        icon: Icons.x,

        navbar: true,
      },
       Reddit: {
        name: "Reddit",
        url: "https://www.reddit.com/user/priyanshuwq",
        icon: Icons.reddit,

        navbar: true,
      },
      email: {
        name: "Email",
        url: "priyanshuofficial2004@gmail.com",
        icon: Icons.email,

        navbar: false,
      },
    },
  },

  work: [],
  education: [],
  projects: [
    {
      slug: "audora",
      title: "Audora",
      dates: "October 2025 - November 2025",
      active: true,
      description:
      "Real-time music streaming platform with synchronized playback and live jam sessions.",
      technologies: [
        "React",
        "TypeScript",
        "JavaScript",
        "MongoDB",
        "TailwindCSS",
        "nodejs",
        "clerk",
        "webrtc",
      ],
      links: [
        {
          type: "Website",
          href: "https://audora.rocks",
          icon: <Icons.globe className="size-5" />,
        },
        {
          type: "Source",
          href: "https://github.com/priyanshuwq/AUDORA",
          icon: <Icons.github className="size-5" />,
        },
      ],
      image: "",
      video: "/aod.mp4/",
    },

    {
      slug: "vibechat",
      title: "VibeChat",
      dates: "August 2025 - September 2025",
      active: true,
      description:
      "Secure real-time chat application with end-to-end encryption. Features direct messaging and GIF support.",
      technologies: [
        "React",
        "Javascript",
        "nodejs",
        "TailwindCSS",
        "Shadcn UI",
        "socket.io",
        "mongoDB",
        "Cloudinary",
      ],
      links: [
        {
          type: "Website",
          href: "https://chat.shekhr.dev",
          icon: <Icons.globe className="size-5" />,
        },
        {
           type: "Source",
          href: "https://github.com/priyanshuwq/Vibe-ChatApp",
          icon: <Icons.github className="size-5" />,
        },
      ],
      image: "/vibechat.png",
      video: "",
    },
    {
      slug: "porsche-911",
      title: "Porsche-911",
      dates: "December 2024 - Ongoing",
      active: false,
      status: "Building",
      description:
      "A website that showcase the porsche 911 car model with stunning visuals and interactive features.",
      technologies: [
        "Three.js",
        "GSAP",
        "JavaScript",
        "Node.js",
        "TailwindCSS",
      ],
      links: [
        {
          type: "Website",
          href: "https://porschegt.vercel.app",
          icon: <Icons.globe className="size-5" />,
        },
        {
           type: "Source",
          href: "#",
          icon: <Icons.github className="size-5" />,
        },
      ],
      image: "",
      video: "/Porsche911.mp4",
    },
    {
      slug: "authentiscan",
      title: "Authentiscan",
      dates: "September2025 - September 2025",
      active: true,
      description:
      "A prototype of a modern, comprehensive certificate verification and issuance platform.",
      technologies: [
        "React",
        "Javascript",
        "nodejs",
        "TailwindCSS",
        "vercel",
      ],
      links: [
        {
          type: "Website",
          href: "https://authenti.vercel.app",
          icon: <Icons.globe className="size-5" />,
        },
        {
           type: "Source",
          href: "https://github.com/priyanshuwq/Authentiscan",
          icon: <Icons.github className="size-5" />,
        },
      ],
      image: "/authentiscan.png",
      video: "",
    },
  ],
  hackathons: [],
  blogs: [
    {
      title: "WebRTC",
      description: "Understanding WebRTC fundamentals, peer-to-peer communication, and building real-time applications.",
      date: "Coming Soon",
      tags: ["WebRTC", "JavaScript", "Real-time"],
      image: "/blog/WebRTC.png",
      status: "upcoming" as const,
      href: undefined,
    },
  ],
} as const;
