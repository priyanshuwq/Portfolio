import Navbar from "@/components/navbar";
import { SimpleFooter } from "@/components/simple-footer";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { DATA } from "@/data/resume";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://shekhr.dev"),
  title: {
    default: DATA.name,
    template: `%s | ${DATA.name}`,
  },
  description: "I'm a FullStack Developer and Open Source Contributor. I love building Interactive web experiences and products to solve real-world problems. Explore my projects, experience and technical expertise.",
  keywords: ["Priyanshu", "FullStack Developer", "Web Developer", "React", "Next.js", "TypeScript", "Portfolio"],
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
        url: "/preview.png",
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
    images: ["/preview.png"],
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body
        className={cn(
          "min-h-screen bg-background antialiased flex flex-col"
        )}
        style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
      >
        <ThemeProvider attribute="class" defaultTheme="light">
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
