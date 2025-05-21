"use client";

import { ArrowLeft, Share2, QrCode } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";

type ActionButtonsProps = {
  qrCodeImage: string;
};

export default function ActionButtons({ qrCodeImage }: ActionButtonsProps) {
  const router = useRouter();
  const [showQr, setShowQr] = useState(false);
  const currentUrl = typeof window !== "undefined" ? window.location.href : "";

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: "Meu Cartão Digital",
          text: "Confira meu cartão digital",
          url: currentUrl,
        });
      } else {
        await navigator.clipboard.writeText(currentUrl);
        alert("Link copiado para a área de transferência!");
      }
    } catch (err) {
      console.error("Erro ao compartilhar:", err);
    }
  };

  return (
    <>
      {/* Container único para todos os botões */}
      <div className="absolute top-4 right-4 z-50 flex gap-2">
        {/* Botão Compartilhar */}
        <button
          onClick={handleShare}
          className="p-2 rounded-full bg-black/30 backdrop-blur-sm text-white hover:bg-black/50 transition-all"
          aria-label="Compartilhar"
        >
          <Share2 className="w-5 h-5" />
        </button>

        {/* Botão QR Code */}
        <button
          onClick={() => setShowQr(true)}
          className="p-2 rounded-full bg-black/30 backdrop-blur-sm text-white hover:bg-black/50 transition-all"
          aria-label="Mostrar QR Code"
        >
          <QrCode className="w-5 h-5" />
        </button>

        {/* Botão Voltar */}
        <button
          onClick={() => router.back()}
          className="p-2 rounded-full bg-black/30 backdrop-blur-sm text-white hover:bg-black/50 transition-all"
          aria-label="Voltar"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
      </div>

      {/* Overlay do QR Code (mantido igual) */}
      {showQr && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-xl text-center max-w-xs w-full relative">
            <button
              onClick={() => setShowQr(false)}
              className="absolute top-2 right-2 p-1 text-gray-500 hover:text-black rounded-full hover:bg-gray-100"
              aria-label="Fechar"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-4 bg-white rounded-lg">
              <Image
                src={qrCodeImage}
                alt="QR Code para compartilhar o cartão"
                width={200}
                height={200}
                className="w-full h-auto"
              />
            </div>

            <p className="text-sm text-gray-600 mt-4">
              Escaneie este QR Code para acessar meu cartão
            </p>
          </div>
        </div>
      )}
    </>
  );
}
