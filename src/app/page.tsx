import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-brand-white">
      <div className="flex flex-row w-full max-w-[900px] h-[100dvh]">
        {/* Ângelo */}
        <Link href="/angelo" className="relative w-1/2 h-full overflow-hidden">
          <Image
            src="/images/angelo.webp"
            alt="Ângelo Rodrigues"
            fill
            className="object-cover filter grayscale"
          />
          <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent px-4 py-6">
            <div className="text-center">
              <p className="text-xs sm:text-sm text-brand-white mb-1">
                CEO, ArtEsfera
              </p>
              <h2 className="text-brand-yellow font-caveat font-bold text-[clamp(1.5rem,4vw,2.5rem)]">
                Ângelo Rodrigues
              </h2>
            </div>
          </div>
        </Link>
        {/* Arthur */}
        <Link href="/arthur" className="relative w-1/2 h-full overflow-hidden">
          <Image
            src="/images/arthur.webp"
            alt="Arthur Bernard"
            fill
            className="object-cover filter grayscale"
          />
          <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent px-4 py-6">
            <div className="text-center">
              <p className="text-xs sm:text-sm text-brand-white mb-1">
                CTO, ArtEsfera
              </p>
              <h2 className="text-brand-yellow font-caveat font-bold text-[clamp(1.5rem,4vw,2.5rem)]">
                Arthur Bernard
              </h2>
            </div>
          </div>
        </Link>
      </div>
    </main>
  );
}
