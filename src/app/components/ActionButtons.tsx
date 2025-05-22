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
          title: "Cartões digitais ArtEsfera",
          text: "Confira nossos contatos!",
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
      {/* Header container */}
      <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-4 py-2 ">
        {/* Botão Voltar */}
        <button
          onClick={() => router.back()}
          className="p-2 rounded-full text-white"
          aria-label="Voltar"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        {/* Ações */}
        <div className="flex gap-2">
          <button
            onClick={handleShare}
            className="p-2 rounded-full text-white "
            aria-label="Compartilhar"
          >
            <Share2 className="w-5 h-5" />
          </button>

          <button
            onClick={() => setShowQr(true)}
            className="p-2 rounded-full text-white "
            aria-label="Mostrar QR Code"
          >
            <QrCode className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Overlay do QR Code */}
      {showQr && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          onClick={(e) => {
            e.stopPropagation(); // <-- prevenir propagação
            setShowQr(false);
          }}
        >
          <div
            className="bg-white p-6 rounded-xl text-center max-w-xs w-full relative"
            onClick={(e) => e.stopPropagation()} // <-- prevenir propagação dentro
          >
            <button
              onClick={(e) => {
                e.stopPropagation(); // <-- garantir que o botão não dispare flip
                setShowQr(false);
              }}
              className="absolute top-2 right-2 p-1 text-brand-black"
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

            <p className="text-sm text-brand-black mt-4">
              Escaneie este QR Code para acessar nossos cartões.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
