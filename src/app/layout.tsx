import Navbar from "@/components/navbar";
import { SimpleFooter } from "@/components/simple-footer";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { DATA } from "@/data/resume";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: DATA.name,
    template: `%s | ${DATA.name}`,
  },
  twitter: {
    title: `${DATA.name}`,
    card: "summary_large_image",
  },
  icons: {
    icon: DATA.avatarUrl,
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
