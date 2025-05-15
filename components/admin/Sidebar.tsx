"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

type SidebarProps = {
  adminName: string | undefined;
  adminEmail: string | undefined;
};

export function Sidebar({ adminName, adminEmail }: SidebarProps) {
  const pathname = usePathname();

  const linkClasses = (path: string) =>
    `block px-3 py-2 rounded-md transition-colors ${
      pathname === path
        ? "bg-blue-100 text-blue-700 font-semibold"
        : "text-gray-700 hover:text-blue-600"
    }`;

  return (
    <aside className="w-64 bg-white border-r p-4 relative">
      <Link href={"/"}>
        <div className="flex items-center mb-6">
          <Image
            src="/images/Nlogo.svg"
            alt="Booky Logo"
            width={32}
            height={32} 
          />
          <span className="text-xl font-bold text-[#155dfcb3] ml-1">Booky</span>
        </div>
      </Link>

      <nav className="space-y-2">
        <Link href="/admin" className={linkClasses("/admin")}>
          Home
        </Link>
        <Link href="/admin/Users" className={linkClasses("/admin/Users")}>
          All Users
        </Link>
        <Link href="/admin/books" className={linkClasses("/admin/books")}>
          All Books
        </Link>
        <Link href="/admin/borrow" className={linkClasses("/admin/borrow")}>
          Borrow Requests
        </Link>
      </nav>

      <div className="absolute bottom-4 left-4 flex items-center space-x-2">
        <div className="w-10 h-10 rounded-full bg-gray-200" />
        <div>
          <p className="text-sm font-semibold">{adminName}</p>
          <p className="text-xs text-green-600">{adminEmail}</p>
        </div>
      </div>
    </aside>
  );
}
