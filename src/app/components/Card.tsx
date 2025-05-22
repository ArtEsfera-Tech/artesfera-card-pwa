"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { MousePointerClickIcon } from "lucide-react";
import PWAInstallButton from "./PWAInstallButton";
import ActionButtons from "./ActionButtons";

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
  const [isFlipped, setIsFlipped] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showHint, setShowHint] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);

    // Animação de entrada após montagem
    const timer = setTimeout(() => setIsLoaded(true), 300);

    return () => {
      window.removeEventListener("resize", checkMobile);
      clearTimeout(timer);
    };
  }, []);

  // Animações
  const hintAnimation = {
    pulse: {
      y: [0, -5, 0],
      transition: { repeat: Infinity, duration: 1.5 },
    },
  };

  const imageAnimation = {
    hidden: { scale: 1.2, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 1.2, ease: "easeOut" },
    },
  };

  const overlayAnimation = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { delay: 0.5, duration: 0.6 },
    },
  };

  // Função para lidar com cliques no cartão
  const handleCardClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (
      target.tagName === "A" ||
      target.closest("a") ||
      target.tagName === "BUTTON" ||
      target.closest("button")
    ) {
      return;
    }

    setIsFlipped(!isFlipped);
    setShowHint(false);
  };

  return (
    <div className="perspective w-full h-full">
      <motion.div
        className="relative max-w-md w-full mx-auto rounded-2xl shadow-2xl"
        onClick={handleCardClick}
        animate={{
          rotateY: isFlipped ? 180 : 0,
          opacity: isLoaded ? 1 : 0,
          scale: isLoaded ? 1 : 0.8,
          y: isLoaded ? 0 : 50,
        }}
        transition={{
          rotateY: { duration: 0.6 },
          opacity: { duration: 0.8, ease: "easeOut" },
          scale: { duration: 0.8, ease: "easeOut" },
          y: { duration: 0.8, ease: "easeOut" },
        }}
        initial={{ opacity: 0, scale: 0.8, y: 50 }}
        style={{
          transformStyle: "preserve-3d",
          aspectRatio: isMobile ? "2/3" : "3/4",
          height: isMobile ? "calc(100vh - 120px)" : undefined,
        }}
      >
        {/* FRENTE do cartão */}
        <motion.div
          className="absolute inset-0 backface-hidden rounded-2xl overflow-hidden"
          style={{
            backfaceVisibility: "hidden",
          }}
        >
          <div className="relative h-full w-full">
            {/* Imagem de fundo com animação */}
            <motion.div variants={imageAnimation} className="absolute inset-0">
              <Image
                src={bgImg}
                alt={bgImgDescription}
                fill
                className="object-cover object-right"
                priority
              />
            </motion.div>

            {/* Overlay gradiente animado */}
            <motion.div
              variants={overlayAnimation}
              className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"
            />

            {/* Elementos decorativos */}
            <motion.div
              variants={overlayAnimation}
              className="absolute top-6 left-6 w-20 h-1 bg-brand-yellow rounded-full"
            />
            <motion.div
              variants={overlayAnimation}
              className="absolute top-10 left-6 w-12 h-1 bg-brand-yellow/60 rounded-full"
            />

            {/* Hint de clique */}
            <AnimatePresence>
              {showHint && (
                <motion.div
                  className="absolute bottom-8 left-0 right-0 flex justify-center"
                  variants={hintAnimation}
                  animate="pulse"
                  exit={{ opacity: 0, y: 20 }}
                >
                  <div className="bg-black/80 backdrop-blur-sm text-white px-6 py-3 rounded-full flex items-center gap-3 border border-brand-yellow/30">
                    <MousePointerClickIcon className="text-brand-yellow w-5 h-5" />
                    <span className="text-sm font-medium">
                      Clique para virar
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* VERSO do cartão */}
        <motion.div
          className="absolute inset-0 backface-hidden rounded-2xl overflow-auto"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            background:
              "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 50%, #1a1a1a 100%)",
          }}
        >
          {/* Padrão de fundo sutil */}
          <div className="absolute inset-0 opacity-5">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `radial-gradient(circle at 25% 25%, #ffd700 2px, transparent 2px),
                              radial-gradient(circle at 75% 75%, #ffd700 1px, transparent 1px)`,
                backgroundSize: "30px 30px",
              }}
            />
          </div>

          <ActionButtons qrCodeImage="/images/qr-code-business.svg" />

          {/* Container principal */}
          <div className="relative z-10 h-full flex flex-col px-8 pt-16">
            {/* Cabeçalho com melhor hierarquia */}
            <motion.div
              className="flex flex-col mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isFlipped ? 1 : 0, y: isFlipped ? 0 : 20 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <Link
                href="https://artesfera.tech"
                target="_blank"
                className="self-start mb-6"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center gap-3 text-brand-white hover:text-brand-yellow transition-colors duration-300">
                  <Image
                    src={logo}
                    alt="Logo"
                    width={56}
                    height={56}
                    className="rounded-xl shadow-lg"
                  />
                  <span className="text-2xl font-lato font-bold tracking-wide">
                    ArtEsfera
                  </span>
                </div>
              </Link>

              {/* Nome e função com mais destaque */}
              <div className="space-y-2">
                <h1 className="text-4xl md:text-5xl font-bold font-caveat text-brand-yellow leading-tight">
                  {name}
                </h1>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-0.5 bg-brand-yellow rounded-full" />
                  <p className="text-xl md:text-2xl font-lato font-light text-brand-white/90">
                    {role}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Espaçador flexível */}
            <div className="flex-1" />

            {/* Seção inferior com melhor organização */}
            <motion.div
              className={`space-y-6 ${isMobile ? "pb-24" : "pb-8"}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: isFlipped ? 1 : 0, y: isFlipped ? 0 : 30 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              {/* Bio com destaque */}
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <p className="text-brand-white/90 text-base md:text-lg font-lato leading-relaxed">
                  {bio}
                </p>
              </div>

              {/* Divisor decorativo */}
              <div className="flex items-center gap-4">
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-brand-yellow/50 to-transparent" />
                <div className="w-2 h-2 bg-brand-yellow rounded-full" />
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-brand-yellow/50 to-transparent" />
              </div>

              {/* Links das redes sociais */}
              <div className="flex flex-wrap justify-center gap-6">
                {links.map((link, idx) => (
                  <Link
                    key={idx}
                    href={link.url}
                    target="_blank"
                    className="group relative text-brand-yellow text-base font-semibold whitespace-nowrap transition-all duration-300 hover:scale-105"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <span className="relative z-10">{link.label}</span>
                    <div className="absolute inset-x-0 bottom-0 h-0.5 bg-brand-yellow scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                  </Link>
                ))}
              </div>
            </motion.div>

            {/* Botão PWA fixo */}
            {isMobile && (
              <motion.div
                className="absolute bottom-0 left-0 right-0 p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isFlipped ? 1 : 0, y: isFlipped ? 0 : 20 }}
                transition={{ delay: 0.7, duration: 0.5 }}
              >
                <PWAInstallButton />
              </motion.div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
