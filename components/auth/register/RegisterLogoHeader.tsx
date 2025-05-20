import Image from "next/image";
import Link from "next/link";

export default function RegisterLogoHeader() {
  return (
    <>
      {/* Logo */}
      <Link href={"/"}>
        <div className="flex items-center gap-3 mb-6 group">
          <div className="relative w-10 h-10 sm:w-12 sm:h-12 bg-white/5 border border-white/10 rounded-full p-1 transition group-hover:scale-105">
            <Image
              src="/images/logo.svg"
              alt="Booky Logo"
              fill
              className="object-contain"
              sizes="(max-width: 640px) 40px, 48px"
              priority
            />
          </div>
          <span className="font-bold text-2xl text-white tracking-tight group-hover:text-[#c9af90] transition">
            Booky
          </span>
        </div>
      </Link>

      {/* Welcome Text */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-white">
          Create Your Library Account
        </h2>
        <p className="text-gray-400 text-sm">
          Please complete all fields to register for library access
        </p>
      </div>
    </>
  );
}
