import type { Metadata, Viewport } from "next";
import "./globals.css";
import { caveat, lato } from "./fonts";
import Image from "next/image";
import Link from "next/link";
import ServiceWorker from "./_components/ServiceWorker";

export const metadata: Metadata = {
  title: "ArtEsfera business card",
  description: "PWA business card",
  manifest: "/manifest.webmanifest",
  icons: {
    icon: "/favicon-32x32.png",
    apple: "/apple-touch-icon.png",
  },
};
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#fcc931",
  // For iOS specific configurations:
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${lato.variable} ${caveat.variable} antialiased`}>
        <ServiceWorker />
        {children}
        <Link
          href="https://artesfera.tech"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden xl:block fixed bottom-4 right-4 z-50"
        >
          <Image
            src="/logo.png"
            alt="ArtEsfera Logo"
            width={40}
            height={40}
            className="opacity-80"
          />
        </Link>
      </body>
    </html>
  );
}
