import type { Metadata, Viewport } from "next";
import "./globals.css";
import { caveat, lato } from "./fonts";
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
  themeColor: "#A4144E",
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
        {children}
        <ServiceWorker />
      </body>
    </html>
  );
}
