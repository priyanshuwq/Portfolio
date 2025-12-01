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
      title: "Audora",
      dates: "August 2025 - Present",
      active: true,
      description:
      "A music-streaming platform built for real-time collaborative listening, with perfectly synchronized playback and live jam sessions with friends.",
      technologies: [
        "React",
        "TypeScript",
        "JavaScript",
        "MongoDB",
        "TailwindCSS",
        "nodejs",
        "clerk",
        "WebRTC",
        "Render",
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
      title: "VibeChat",
      dates: "July 2025 - September 2025",
      active: true,
      description:
      "A real-time, Secure chat where each user can only access their own conversations, built with the MERN stack and featuring direct messaging, image sharing, GIF support.",
      technologies: [
        "React",
        "Javascript",
        "nodejs",
        "TailwindCSS",
        "Shadcn UI",
        "mongoDB",
        "cloudinary",
        "socket.io",
        "Render",
      ],
      links: [
        {
          type: "Website",
          href: "https://llm.report",
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
      title: "Porsche-911",
      dates: "July 2025 - September 2025",
      active: true,
      description:
      "A website that showcase the porsche 911 car model with stunning visuals and interactive features.",
      technologies: [
        "React",
        "Javascript",
        "nodejs",
        "TailwindCSS",
        "Shadcn UI",
        "mongoDB",
        "cloudinary",
        "socket.io",
        "Render",
      ],
      links: [
        {
          type: "Website",
          href: "https://llm.report",
          icon: <Icons.globe className="size-5" />,
        },
        {
           type: "Source",
          href: "https://github.com/priyanshuwq/Vibe-ChatApp",
          icon: <Icons.github className="size-5" />,
        },
      ],
      image: "",
      video: "",
    },
    {
      title: "Authentiscan",
      dates: "July 2025 - September 2025",
      active: true,
      description:
      "A prototype of a modern, comprehensive certificate verification and issuance platform. AuthentiScan provides blockchain-powered certificate authentication with a beautiful, responsive interface.",
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
      image: "",
      video: "",
    },
  ],
  hackathons: [],
} as const;
