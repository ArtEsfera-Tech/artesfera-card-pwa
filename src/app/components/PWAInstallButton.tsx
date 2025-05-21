"use client";

import { useState } from "react";
import { usePWAInstall } from "@/hooks/usePWAInstall";
import { Download } from "lucide-react";

export default function PWAInstallButton() {
  const { isInstallable, install } = usePWAInstall();
  const [installed, setInstalled] = useState(false);

  const handleInstallClick = async () => {
    const accepted = await install();
    if (accepted) {
      setInstalled(true);
    }
  };

  if (installed) {
    return (
      <div className="w-full py-3 bg-brand-yellow text-center text-brand-black font-medium">
        ✓ Cartão salvo com sucesso!
      </div>
    );
  }

  if (!isInstallable) return null;

  return (
    <button
      onClick={handleInstallClick}
      className="w-full py-3 bg-brand-yellow/90 hover:bg-brand-yellow text-black font-medium flex items-center justify-center gap-2 transition-all"
    >
      <Download className="w-4 h-4" />
      Salvar este cartão
    </button>
  );
}
