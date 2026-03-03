import Navbar from "@/components/navbar";
import { SimpleFooter } from "@/components/simple-footer";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { DATA } from "@/data/resume";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://shekhr.dev"),
  title: {
    default: "Priyanshu Shekhar Singh | Full-Stack Developer & Open Source Contributor",
    template: `%s | ${DATA.name}`,
  },
  description: "I'm a FullStack Developer and Open Source Contributor. I love building Interactive web experiences and products to solve real-world problems. Explore my projects, experience and technical expertise.",
  keywords: [
    "Priyanshu Shekhar Singh",
    "Priyanshu Singh", 
    "Priyanshu",
    "Shekhr Dev",
    "Shekhr",
    "priyanshuwq",
    "Full-Stack Developer",
    "FullStack Developer India",
    "Web Developer",
    "React Developer",
    "Next.js Developer", 
    "TypeScript Developer",
    "MERN Stack Developer",
    "Open Source Contributor",
    "JavaScript Developer",
    "Node.js Developer",
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "JavaScript",
    "MongoDB",
    "TailwindCSS",
    "GSAP",
    "Three.js",
    "WebRTC",
    "Socket.io",
    "Portfolio",
    "Shekhr Portfolio",
    "Shekhr Dev Projects",
  ],
  authors: [{ name: DATA.name }],
  creator: DATA.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://shekhr.dev",
    title: DATA.name,
    description: "I'm a FullStack Developer and Open Source Contributor. I love building Interactive web experiences and products to solve real-world problems. Explore my projects, experience and technical expertise.",
    siteName: DATA.name,
    images: [
      {
        url: "/herosection/preview.png",
        width: 1200,
        height: 630,
        alt: `${DATA.name} - FullStack Developer`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: DATA.name,
    description: "I'm a FullStack Developer and Open Source Contributor. I love building Interactive web experiences and products to solve real-world problems. Explore my projects, experience and technical expertise.",
    creator: "@priyanshuwq",
    images: ["/herosection/preview.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: DATA.avatarUrl,
    shortcut: DATA.avatarUrl,
    apple: DATA.avatarUrl,
  },
  alternates: {
    canonical: "https://shekhr.dev",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="hsl(var(--background))" />
        <link rel="preconnect" href="https://api.github.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://cal.com" />
        <link href="https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
        
        {/* JSON-LD Structured Data for Person Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Priyanshu Shekhar Singh",
              alternateName: ["Priyanshu", "Shekhr", "Shekhr Dev", "priyanshuwq"],
              url: "https://shekhr.dev",
              image: "https://shekhr.dev/herosection/profile.png",
              jobTitle: "Full-Stack Web Developer",
              description: "Full-Stack Developer and Open Source Contributor specializing in React, Next.js, and TypeScript. Building interactive web experiences and products.",
              email: "priyanshuofficial2004@gmail.com",
              sameAs: [
                "https://github.com/priyanshuwq",
                "https://www.linkedin.com/in/priyanshuwq",
                "https://x.com/priyanshuwq",
                "https://www.reddit.com/user/priyanshuwq",
                "https://cal.com/priyanshuwq",
              ],
              knowsAbout: [
                "React",
                "Next.js",
                "TypeScript",
                "Node.js",
                "JavaScript",
                "MongoDB",
                "Full-Stack Development",
                "Web Development",
                "GSAP Animation",
                "Three.js",
                "WebRTC",
                "Socket.io",
                "TailwindCSS",
                "REST API",
                "Real-time Applications",
              ],
              worksFor: {
                "@type": "Organization",
                name: "Independent Developer",
              },
            }),
          }}
        />
        
        {/* JSON-LD Structured Data for WebSite Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Shekhr Dev | Priyanshu Shekhar Singh Portfolio",
              alternateName: "Shekhr Portfolio",
              url: "https://shekhr.dev",
              description: "Full-Stack Developer portfolio showcasing interactive web projects, open source contributions, and technical expertise in React, Next.js, and modern web technologies.",
              author: {
                "@type": "Person",
                name: "Priyanshu Shekhar Singh",
                url: "https://shekhr.dev",
              },
              inLanguage: "en-US",
              copyrightYear: new Date().getFullYear(),
              creator: {
                "@type": "Person",
                name: "Priyanshu Shekhar Singh",
              },
            }),
          }}
        />
      </head>
      <body
        className={cn(
          "min-h-screen bg-background antialiased flex flex-col"
        )}
        style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <TooltipProvider delayDuration={0}>
            <Navbar />
            <main className="flex-1">
              <div className="max-w-2xl mx-auto py-12 sm:py-24 px-6">
                {children}
              </div>
            </main>
            <SimpleFooter />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
