// app/loading.tsx
import Image from "next/image";

export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-[#121222] text-white">
      <div className="flex items-center space-x-4 mb-4">
        <div className="animate-spin h-12 w-12 border-4 border-white border-t-transparent rounded-full"></div>
        <Image src="/images/logo.svg" alt="Booky Logo" width={32} height={32} />
        <span className="text-xl font-bold text-gray-300">Booky</span>
      </div>
      <p className="text-gray-400 text-sm">Loading your page...</p>
    </div>
  );
}
