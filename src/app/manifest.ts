import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Shekhr Dev | Priyanshu Shekhar Singh - Full-Stack Developer Portfolio",
    short_name: "Shekhr Dev",
    description: "Full-Stack Developer and Open Source Contributor. Portfolio showcasing interactive web projects built with React, Next.js, TypeScript, and modern web technologies.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#000000",
    icons: [
      {
        src: "/herosection/profile.png",
        sizes: "any",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
