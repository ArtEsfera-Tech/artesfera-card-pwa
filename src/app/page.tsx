"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-brand-black">
      <div className="flex flex-row w-full max-w-[900px] h-[100dvh]">
        {/* Ângelo */}
        <Link href="/angelo" className="relative w-1/2 h-full overflow-hidden">
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <Image
              src="/images/angelo.webp"
              alt="Ângelo Rodrigues"
              fill
              className="object-cover filter grayscale"
            />
          </motion.div>
          <motion.div
            className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent px-4 py-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.8, ease: "easeOut" }}
          >
            <div className="text-center">
              <p className="text-xs sm:text-sm text-brand-white mb-1 font-lato">
                CEO, ArtEsfera
              </p>
              <h2 className="text-brand-yellow font-caveat font-bold text-[clamp(1.5rem,4vw,2.5rem)]">
                Ângelo Rodrigues
              </h2>
            </div>
          </motion.div>
        </Link>

        {/* Arthur */}
        <Link href="/arthur" className="relative w-1/2 h-full overflow-hidden">
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <Image
              src="/images/arthur.webp"
              alt="Arthur Bernard"
              fill
              className="object-cover filter grayscale object-[center_10%]"
            />
          </motion.div>
          <motion.div
            className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent px-4 py-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.8, ease: "easeOut" }}
          >
            <div className="text-center">
              <p className="text-xs sm:text-sm text-brand-white mb-1 font-lato">
                CTO, ArtEsfera
              </p>
              <h2 className="text-brand-yellow font-caveat font-bold text-[clamp(1.5rem,4vw,2.5rem)]">
                Arthur Bernard
              </h2>
            </div>
          </motion.div>
        </Link>
      </div>
    </main>
  );
}
