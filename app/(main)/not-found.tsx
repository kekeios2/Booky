"use client";

import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0e0f1a] text-primary flex flex-col items-center justify-center px-4 text-center">
      {/* شعار Booky */}
      <div className="absolute top-6 left-6 flex items-center gap-2">
        <Image src="/images/logo.svg" alt="Booky Logo" width={32} height={32} />
        <span className="text-xl font-bold text-gray-300">Booky</span>
      </div>

      {/* محتوى صفحة 404 */}
      <h1 className="text-6xl font-bold mb-2">404</h1>

      <p className="text-xl mb-2 text-[#7a786c] font-semibold">
        This page ran away with a good book 📚
      </p>

      <p className="text-sm text-[#7a786c] mb-6">
        We looked everywhere, even under the couch. Nothing.
        <br />
        Let's get you back to familiar shelves.
      </p>

      <Link
        href="/"
        className="mt-2 bg-[#c9af90] hover:bg-[#b59974] text-black px-6 py-2 rounded-md font-semibold transition"
      >
        Return to Home
      </Link>
    </div>
  );
}
