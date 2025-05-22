"use client";

import { useState, useEffect, useRef } from "react";
import { usePWAInstall } from "@/hooks/usePWAInstall";
import { Download, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

interface PWAInstallButtonProps {
  vcfUrl: string;
}

export default function PWAInstallButton({ vcfUrl }: PWAInstallButtonProps) {
  const { isInstallable, install } = usePWAInstall();
  const [showPopup, setShowPopup] = useState(false);
  const [canInstall, setCanInstall] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);

  const storageKey = `vcf-downloaded-${vcfUrl}`;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        setShowPopup(false);
      }
    }

    if (showPopup) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [showPopup]);

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    const alreadyDownloaded = localStorage.getItem(storageKey) === "true";

    if (alreadyDownloaded) {
      setCanInstall(isInstallable);
      setShowPopup(true);
      return;
    }

    try {
      const response = await fetch(vcfUrl);
      if (!response.ok)
        throw new Error(`Erro ao buscar arquivo: ${response.status}`);

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = vcfUrl.split("/").pop() || "contact.vcf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      localStorage.setItem(storageKey, "true");

      setCanInstall(isInstallable);
      setShowPopup(true);
    } catch (error) {
      console.error("Erro ao baixar o arquivo:", error);
      alert("Erro ao baixar o arquivo. Verifique se ele está disponível.");
    }
  };

  return (
    <div className="w-full" onClick={(e) => e.stopPropagation()}>
      <button
        onClick={handleClick}
        className="w-full py-3 bg-brand-yellow/90 text-black font-medium flex items-center justify-center gap-2"
      >
        <Download className="w-4 h-4" />
        Salvar este contato
      </button>

      <AnimatePresence>
        {showPopup && (
          <motion.div
            key="popup-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          >
            <motion.div
              key="popup-content"
              ref={popupRef}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="bg-brand-white text-black rounded-xl p-6 max-w-sm w-full shadow-lg relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowPopup(false);
                }}
                className="absolute top-3 right-3 text-black "
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-center font-semibold text-lg mb-2">
                ✓ Contato salvo com sucesso!
              </div>

              {canInstall && (
                <>
                  <div className="text-center text-sm mb-4">
                    Deseja instalar o app para ter os cartões offline?
                  </div>
                  <div className="flex justify-center gap-3">
                    <button
                      onClick={async (e) => {
                        e.stopPropagation();
                        const accepted = await install();
                        if (accepted) setShowPopup(false);
                      }}
                      className="px-4 py-2 bg-brand-navyBlue text-white rounded"
                    >
                      Instalar app
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowPopup(false);
                      }}
                      className="px-4 py-2 text-black border border-black rounded"
                    >
                      Agora não
                    </button>
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
