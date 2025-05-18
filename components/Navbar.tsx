"use client";

import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { CiLogout } from "react-icons/ci";
import { IoMenu } from "react-icons/io5";
import { RxExitFullScreen } from "react-icons/rx";
import {  useState } from "react";
import { signOut } from "next-auth/react";
import NotificationBell from "./NotificationBell";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState<false | "mobile" | "logout">(false);
  const { data: session } = useSession();
  const user = session?.user;

  const avatar = user?.image ? (
    <Image
      src={user.image}
      alt="User avatar"
      width={32}
      height={32}
      className="rounded-full object-cover"
    />
  ) : (
    <div className="bg-sky-200 rounded-full w-8 h-8 flex items-center justify-center">
      <span className="text-gray-800 text-lg font-medium">
        {user?.fullName?.[0]?.toUpperCase() ||
          user?.email?.[0]?.toUpperCase() ||
          "?"}
      </span>
    </div>
  );

  const displayName = user?.fullName || user?.email?.split("@")[0] || "User";

  return (
    <>
      <header className="w-full relative z-50">
        <div className="py-4 shadow-md bg-[#121222]">
          <div className="container mx-auto px-4 flex justify-between items-center">
            <Link
              href="/"
              className="flex items-center gap-2 hover:opacity-80 w-auto h-auto"
            >
              <Image
                src="/images/logo.svg"
                alt="Booky Logo"
                width={32}
                height={32}
              />
              <span className="text-xl font-bold text-gray-300">Booky</span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden sm:flex items-center gap-6">
              <Link
                href="/search"
                className="text-[#EED1AC] hover:text-orange-600 transition-colors"
              >
                Search
              </Link>
              <div></div>
              {user ? (
                <div className="flex items-center gap-4">
                  <NotificationBell />

                  <Link
                    href="/profile"
                    className="flex items-center gap-2 hover:opacity-80"
                  >
                    {avatar}
                    <span className="text-white hidden sm:inline">
                      {displayName}
                    </span>
                  </Link>
                  <button
                    onClick={() => setMenuOpen("logout")}
                    className="text-[#EED1AC] hover:text-red-500 transition-colors"
                  >
                    <CiLogout size={20} />
                  </button>
                </div>
              ) : (
                <Link href="/login">
                  <button className="text-[#EED1AC] hover:text-orange-600 transition-colors">
                    Login
                  </button>
                </Link>
              )}
            </nav>

            {/* Burger Icon */}
            <button
              onClick={() =>
                setMenuOpen(menuOpen === "mobile" ? false : "mobile")
              }
              className="sm:hidden text-white"
            >
              {menuOpen === "mobile" ? (
                <RxExitFullScreen size={28} />
              ) : (
                <IoMenu size={28} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`sm:hidden absolute top-full left-0 w-full bg-[#121222] border-t border-gray-700 shadow-lg px-4 pt-4 transition-all duration-300 ease-in-out overflow-hidden z-40 ${
            menuOpen === "mobile"
              ? "max-h-[500px] opacity-100"
              : "max-h-0 opacity-0"
          }`}
        >
          <div className="space-y-4 pb-4">
            <Link
              href="/search"
              className="block text-white"
              onClick={() => setMenuOpen(false)}
            >
              Search
            </Link>

            {user ? (
              <>
                <Link
                  href="/profile"
                  className="block text-white"
                  onClick={() => setMenuOpen(false)}
                >
                  {displayName}
                </Link>
                <button
                  className="block text-red-400"
                  onClick={() => setMenuOpen("logout")}
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className="block text-white"
                onClick={() => setMenuOpen(false)}
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Signout Modal */}
      {menuOpen === "logout" && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center px-4">
          <div className="bg-[#1E1E2D] text-white p-6 rounded-2xl w-full max-w-sm text-center space-y-4 shadow-xl">
            <h2 className="text-xl font-bold">Sign Out</h2>
            <p className="text-gray-400 text-sm">
              Are you sure you want to leave the bookshelf?
            </p>

            <div className="flex justify-center gap-3 pt-2">
              <button
                onClick={() => signOut()}
                type="submit"
                className="bg-gradient-to-r from-red-500 to-red-400 text-white font-semibold px-5 py-2 rounded-lg hover:from-red-600 hover:to-red-500 transition"
              >
                Sign out
              </button>
              <button
                onClick={() => setMenuOpen(false)}
                className="bg-gray-700 text-gray-300 font-medium px-5 py-2 rounded-lg hover:bg-gray-600 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
