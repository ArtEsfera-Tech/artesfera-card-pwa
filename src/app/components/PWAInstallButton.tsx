"use client";

import { useState } from "react";
import { usePWAInstall } from "@/hooks/usePWAInstall";

export default function PWAInstallButton() {
  const { isInstallable, install } = usePWAInstall();
  const [installed, setInstalled] = useState(false);

  const handleInstallClick = async () => {
    const accepted = await install();
    if (accepted) {
      console.log("PWA instalada com sucesso");
      setInstalled(true);
    }
  };

  if (installed) {
    return (
      <p className="mt-4 text-green-600 font-semibold">
        Cartão salvo com sucesso!
      </p>
    );
  }

  if (!isInstallable) return null;

  return (
    <button
      onClick={handleInstallClick}
      className="max-w-sm mx-auto mt-10 flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 transition"
    >
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M12 12V4m0 0L8 8m4-4l4 4"
        />
      </svg>
      Salvar no celular
    </button>
  );
}
