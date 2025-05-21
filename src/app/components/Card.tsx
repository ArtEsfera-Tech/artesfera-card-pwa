"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import ActionButtons from "./ActionButtons";
import PWAInstallButton from "./PWAInstallButton";

export type CardProps = {
  name: string;
  role: string;
  bio: string;
  avatar: string;
  logo: string;
  links: {
    label: string;
    url: string;
  }[];
};

export default function Card({
  name,
  role,
  bio,
  avatar,
  logo,
  links,
}: CardProps) {
  return (
    <motion.div
      className="relative max-w-md w-full mx-auto rounded-2xl shadow-xl overflow-hidden flex flex-col"
      style={{ aspectRatio: "3/4" }}
    >
      {/* Background Image with overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src={avatar}
          alt={`Foto de ${name}`}
          fill
          className="object-cover"
          style={{ filter: "brightness(0.75)" }}
          sizes="(max-width: 640px) 100vw, 400px"
          priority
        />
      </div>
      <ActionButtons qrCodeImage="/images/qr-code-business.svg" />
      {/* Semi-transparent overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/70" />
      {/* Main content container with padding bottom for PWA button */}
      <div className="relative z-10 flex-1 flex flex-col p-6">
        {/* Aumente o padding-bottom conforme necessário */}
        {/* Top section - Logo and basic info */}
        <div className="flex flex-col">
          <Link
            href="https://artesfera.tech"
            target="_blank"
            className="self-start mb-4"
          >
            <Image
              src={logo}
              alt="ArtEsfera Logo"
              width={64}
              height={64}
              className="rounded-lg hover:opacity-80 transition-opacity"
            />
          </Link>
          <div className="text-brand-white">
            <h1 className="text-2xl md:text-3xl font-bold font-caveat">
              {name}
            </h1>
            <p className="text-lg md:text-xl font-lato mt-1">{role}</p>
          </div>
        </div>
        <div className="flex-1 flex items-center my-4">
          <p className="text-brand-white text-base md:text-lg font-lato">
            {bio}
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-4 md:gap-6">
          {links.map((link, idx) => (
            <a
              key={idx}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-yellow text-sm sm:text-base font-semibold whitespace-nowrap"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>

      {/* PWAInstallButton positioned at the very bottom */}
      <div className="relative z-20">
        <PWAInstallButton />
      </div>
    </motion.div>
  );
}
