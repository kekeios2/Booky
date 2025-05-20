"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function NotFound({ status = 404 }: { status?: number }) {
  const pathname = usePathname();

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#0e0f1a] to-[#151821] text-primary flex flex-col items-center justify-center px-4 text-center">
      {/* شعار Booky */}
      <Link href="/" className="absolute top-6 left-6 flex items-center gap-2">
        <Image src="/images/logo.svg" alt="Booky Logo" width={36} height={36} />
        <span className="text-2xl font-bold text-white tracking-tight">
          Booky
        </span>
      </Link>

      {/* صورة الخطأ */}
      <div className="w-44 h-44 sm:w-56 sm:h-56 mb-6 relative">
        <Image
          src="/images/404-book-illustration.png"
          alt="Error Illustration"
          fill
          className="object-contain"
          priority
        />
      </div>

      {/* رمز الخطأ */}
      <h1 className="text-6xl sm:text-7xl font-extrabold text-white drop-shadow mb-3">
        {status}
      </h1>

      {/* العنوان والوصف بناءً على الحالة */}
      {status === 404 && (
        <>
          <p className="text-xl sm:text-2xl text-[#c9af90] font-semibold mb-2">
            This page ran away with a good book 📚
          </p>
          <p className="text-sm sm:text-base text-gray-400 max-w-md mb-6">
            We looked everywhere, even under the couch. Nothing.
            <br />
            Let's get you back to familiar shelves.
          </p>
        </>
      )}

      {status === 500 && (
        <>
          <p className="text-xl sm:text-2xl text-[#c9af90] font-semibold mb-2">
            Our shelves are a bit messy right now 🛠️
          </p>
          <p className="text-sm sm:text-base text-gray-400 max-w-md mb-6">
            Looks like the server tripped on a stack of books.
            <br />
            We're on it! Please try again later.
          </p>
        </>
      )}

      {status === 403 && (
        <>
          <p className="text-xl sm:text-2xl text-[#c9af90] font-semibold mb-2">
            You’re not allowed into this section 🚫
          </p>
          <p className="text-sm sm:text-base text-gray-400 max-w-md mb-6">
            Maybe it's a restricted scroll or a librarian-only aisle.
            <br />
            Either way, you don’t have permission.
          </p>
        </>
      )}

      {/* زر العودة */}
      <Link
        href="/"
        className="mt-2 bg-[#c9af90] hover:bg-[#b59974] text-black px-6 py-2 rounded-md font-semibold transition"
      >
        Return to Home
      </Link>
    </div>
  );
}
