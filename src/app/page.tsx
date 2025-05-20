import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100 flex flex-col items-center justify-center gap-8">
      <h1 className="text-xl font-semibold text-gray-800">Escolha um cartão</h1>
      <div className="flex gap-8">
        <Link href="/arthur">
          <div className="text-center">
            <Image
              src="/me.jpg"
              alt="Daedaluzz"
              width={80}
              height={80}
              className="rounded-full"
            />
            <p className="mt-2 text-sm text-gray-700">Daedaluzz</p>
          </div>
        </Link>
        <Link href="/angelo">
          <div className="text-center">
            <Image
              src="/socio.jpg"
              alt="Sócio"
              width={80}
              height={80}
              className="rounded-full"
            />
            <p className="mt-2 text-sm text-gray-700">Sócio</p>
          </div>
        </Link>
      </div>
    </main>
  );
}
