"use client";

import { motion } from "framer-motion";
import Image from "next/image";

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
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-sm mx-auto mt-10 bg-white rounded-2xl shadow-xl p-6 text-center space-y-4"
    >
      <div className="flex justify-center">
        <Image
          src={avatar}
          alt={`Foto de ${name}`}
          width={100}
          height={100}
          className="rounded-full object-cover"
        />
      </div>
      <div>
        <h1 className="text-2xl font-bold text-gray-800">{name}</h1>
        <p className="text-sm text-gray-500">{role}</p>
        <p className="text-sm text-gray-600 mt-2">{bio}</p>
      </div>
      <div className="flex justify-center gap-4 flex-wrap">
        {links.map((link, idx) => (
          <a
            key={idx}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline text-sm"
          >
            {link.label}
          </a>
        ))}
      </div>
      <div className="flex justify-center mt-4">
        <Image
          src={logo}
          alt="Logo"
          width={80}
          height={80}
          className="rounded-lg"
        />
      </div>
    </motion.div>
  );
}
