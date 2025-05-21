import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Contatos ArtEsfera",
    short_name: "Contatos",
    description: "Cartão digital para membros da ArtEsfera.",
    start_url: "/",
    display: "standalone",
    background_color: "#292423",
    theme_color: "#fcc931",
    icons: [
      {
        src: "/android-chrome-192x192.svg",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/android-chrome-512x512.svg",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/android-chrome-1024x1024.svg",
        sizes: "1024x1024",
        type: "image/svg",
        purpose: "maskable",
      },

      {
        src: "/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
      },
      {
        src: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
      {
        src: "/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        src: "/favicon.ico",
        sizes: "48x48",
        type: "image/x-icon",
      },
    ],
  };
}
