// Tools and technologies data
// This file can be imported in both client and server components

export interface Tool {
  name: string;
}

export const languages: Tool[] = [
  { name: "TypeScript" },
  { name: "JavaScript" },
  { name: "Python" },
  { name: "HTML" },
  { name: "CSS" },
];

export const tools: Tool[] = [
  { name: "Tailwind CSS" },
  { name: "Bootstrap" },
  { name: "MongoDB" },
  { name: "Node.js" },
  { name: "React" },
  { name: "Next.js" },
  { name: "Express" },
  { name: "Clerk" },
  { name: "Google OAuth" },
  { name: "Arch Linux" },
  { name: "FFmpeg" },
  { name: "yt-dlp" },
  { name: "Obsidian" },
  { name: "OBS Studio" },
  { name: "Kdenlive" },
  { name: "Stripe" },
  { name: "WebRTC" },
  { name: "Socket.io" },
  { name: "Postman" },
];

// Combine all tech stack into one array
export const allTech = [...languages, ...tools];
