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
        src: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/android-chrome-512x512-maskable.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/android-chrome-1024x1024.png",
        sizes: "1024x1024",
        type: "image/png",
        purpose: "maskable",
      }
    ],
  };
}
