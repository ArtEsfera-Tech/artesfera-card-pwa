"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import ActionButtons from "./ActionButtons";
import PWAInstallButton from "./PWAInstallButton";

export type CardProps = {
  name: string;
  role: string;
  bio: string;
  bgImg: string;
  bgImgDescription: string;
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
  bgImg,
  bgImgDescription,
  logo,
  links,
}: CardProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if the device is mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    checkMobile();

    // Add event listener for window resize
    window.addEventListener("resize", checkMobile);

    // Cleanup
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const contentVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
      },
    },
  };

  return (
    <motion.div
      className="relative max-w-md w-full mx-auto rounded-2xl shadow-xl overflow-hidden flex flex-col"
      style={{
        aspectRatio: isMobile ? "2/3" : "3/4", // Taller on mobile
        height: isMobile ? "calc(100vh - 120px)" : undefined, // Account for browser bars on mobile
      }}
      initial="hidden"
      animate="visible"
      variants={cardVariants}
    >
      <ActionButtons qrCodeImage="/images/qr-code-business.svg" />
      {/* Background Image with overlay */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{
          opacity: 1,
          scale: 1,
          transition: {
            duration: 1.2,
            ease: "easeOut",
          },
        }}
      >
        <Image
          src={bgImg}
          alt={bgImgDescription}
          fill
          className="object-cover object-right"
          style={{ filter: "brightness(0.75)" }}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
          priority
        />
      </motion.div>

      {/* Semi-transparent overlay for better text readability */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-brand-yellow/10 to-black/70"
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          transition: {
            duration: 1.5,
            ease: "easeOut",
          },
        }}
      />

      {/* Main content container with padding bottom for PWA button */}
      <motion.div
        className="relative z-10 flex-1 flex flex-col px-6 pt-16 pb-6"
        variants={contentVariants}
      >
        {/* Top section - Logo and basic info */}
        <motion.div className="flex flex-col" variants={itemVariants}>
          <Link
            href="https://artesfera.tech"
            target="_blank"
            className="self-start mb-4"
          >
            <motion.div
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 text-brand-white text-4xl font-lato font-bold"
            >
              <Image
                src={logo}
                alt="ArtEsfera Logo"
                width={64}
                height={64}
                className="rounded-lg "
              />
              ArtEsfera
            </motion.div>
          </Link>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold font-caveat text-brand-yellow">
              {name}
            </h1>
            <p className="text-lg md:text-xl font-lato font-light mt-1 text-brand-white">
              {role}
            </p>
          </div>
        </motion.div>

        {/* Bio section - Using mt-auto to push it to the bottom when needed */}
        <motion.div
          className="flex-1 flex flex-col justify-end my-4"
          variants={itemVariants}
        >
          <p className="text-brand-white text-base md:text-lg font-lato">
            {bio}
          </p>
        </motion.div>

        <motion.div
          className="flex flex-wrap justify-center gap-4 md:gap-6"
          variants={itemVariants}
        >
          {links.map((link, idx) => (
            <motion.a
              key={idx}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-yellow text-sm sm:text-base font-semibold whitespace-nowrap"
              whileTap={{ scale: 0.95 }}
            >
              {link.label}
            </motion.a>
          ))}
        </motion.div>
      </motion.div>

      {/* PWAInstallButton positioned at the very bottom */}
      <motion.div
        className="relative z-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{
          opacity: 1,
          y: 0,
          transition: {
            delay: 1,
            duration: 0.5,
          },
        }}
      >
        <PWAInstallButton />
      </motion.div>
    </motion.div>
  );
}
