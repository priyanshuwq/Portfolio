import { ReactNode, ComponentType } from "react";
import { LucideIcon } from "lucide-react";

// Project types
export interface ProjectLink {
  type: "Website" | "Source";
  href: string;
  icon: ReactNode;
}

export interface Project {
  slug: string;
  title: string;
  dates: string;
  active: boolean;
  status?: "Building" | "Active" | "Completed";
  role?: string;
  team?: string;
  timeline?: string;
  description: string;
  technologies: readonly string[];
  links: ProjectLink[];
  image: string;
  video?: string;
}

export interface ProjectContent {
  overview: string;
  features: string[];
  techStack: string[];
  highlights?: string[];
}

// Blog types
export interface Blog {
  title: string;
  description: string;
  date: string;
  tags: readonly string[];
  image: string;
  status: "published" | "upcoming";
  href?: string;
}

// Navigation types
export interface NavItem {
  href: string;
  icon: LucideIcon;
  label: string;
}

// Social types
export interface SocialLink {
  name: string;
  url: string;
  icon: ComponentType<{ className?: string }>;
  navbar: boolean;
}

export interface Contact {
  email: string;
  tel: string;
  social: Record<string, SocialLink>;
}

// Music / Now Playing types
export interface MusicTrack {
  isPlaying: boolean;
  title?: string;
  artist?: string;
  album?: string;
  albumImageUrl?: string;
  songUrl?: string;
}

// Visitor types
export interface VisitorData {
  count: number;
  lastUpdated: string;
}

// Resume/Portfolio data types
export interface ResumeData {
  name: string;
  initials: string;
  url: string;
  location: string;
  locationLink: string;
  description: string;
  summary: string;
  avatarUrl: string;
  skills: readonly string[];
  navbar: NavItem[];
  contact: Contact;
  work: readonly unknown[];
  education: readonly unknown[];
  projects: readonly Project[];
  blogs: readonly Blog[];
}
