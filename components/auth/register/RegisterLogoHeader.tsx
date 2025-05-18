// components/register/RegisterLogoHeader.tsx
import Image from "next/image";
import Link from "next/link";

export default function RegisterLogoHeader() {
  return (
    <>
      {/* Logo */}
      <Link href={"/"}>
        <div className="flex items-center gap-2 mb-6">
          <Image
            src="/images/logo.svg"
            alt="Booky Logo"
            width={30}
            height={30}
          />
          <span className="font-bold text-xl text-white">Booky</span>
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
