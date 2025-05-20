import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-brand-white">
      <div className="flex flex-row w-full max-w-[900px] h-screen">
        {/* Arthur */}
        <Link href="/arthur" className="relative w-1/2 h-full overflow-hidden">
          <Image
            src="/images/arthur.webp"
            alt="Arthur Bernard"
            fill
            className="object-cover filter grayscale"
          />
          <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent px-4 py-6">
            <h2 className="text-brand-yellow font-caveat font-bold text-[clamp(1.5rem,4vw,2.5rem)] text-center">
              Arthur Bernard
            </h2>
          </div>
        </Link>

        {/* Ângelo */}
        <Link href="/angelo" className="relative w-1/2 h-full overflow-hidden">
          <Image
            src="/images/angelo.webp"
            alt="Ângelo Rodrigues"
            fill
            className="object-cover filter grayscale"
          />
          <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent px-4 py-6">
            <h2 className="text-brand-yellow font-caveat font-bold text-[clamp(1.5rem,4vw,2.5rem)] text-center">
              Ângelo Rodrigues
            </h2>
          </div>
        </Link>
      </div>
    </main>
  );
}
