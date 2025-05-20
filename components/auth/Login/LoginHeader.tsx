// components/login/LoginHeader.tsx
import Link from "next/link";
import Image from "next/image";

export default function LoginHeader({ verified }: { verified: boolean }) {
  return (
    <>
      {/* Logo */}
      <Link href={"/"}>
        <div className="flex items-center gap-2 mb-6">
          <Image src="/images/logo.svg" alt="Booky Logo" width={30} height={30} />
          <span className="font-bold text-xl text-white">Booky</span>
        </div>
      </Link>

      {/* Welcome Text */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-white">Welcome Back to Booky</h2>
        <p className="text-gray-400 text-sm">
          Access the vast collection of resources, and stay updated
        </p>
      </div>

      {/* Verification success message */}
      {verified && (
        <div className="bg-[#1F2937] border border-green-100 text-green-400 px-4 py-3 rounded mb-4">
          Woohoo! Your email is officially verified. Time to strut your stuff and log in!
        </div>
      )}
    </>
  );
}
