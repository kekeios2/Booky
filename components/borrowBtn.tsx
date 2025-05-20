"use client"
import React from "react";
import Image from "next/image";
import { toast } from "sonner";

interface BorrowBtnProps {
  bookId: number;
  isBorrowed?: boolean;
}

export default function BorrowBtn({ bookId, isBorrowed = false }: BorrowBtnProps) {
  const buttonText = isBorrowed ? "Take a Look" : "Borrow The Book";
  
  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    
    if (isBorrowed) {
      // Navigate to view book page or open PDF
      window.location.href = `/profile`;
      return;
    }
    
    try {
      const res = await fetch("/api/borrow", {
        method: "POST",
        body: JSON.stringify({ bookId: bookId }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      res.ok ? toast.success(data.message) : toast.error(data.error);
    } catch {
      toast.error("Something went wrong. Try again.");
    }
  };

  return (
    <div
      className="flex items-center justify-center bg-[#c9af90] hover:bg-[#a18d73] text-gray-900 font-bold py-2 px-6 rounded-lg transition shadow shadow-amber-500/20"
      onClick={handleClick}
    >
      <Image
        src="https://ik.imagekit.io/xt6hfeibgz/Ui-Images/BlackLogo.svg?updatedAt=1747785332406"
        alt="logo"
        width={20}
        height={20}
        className="mr-2"
      />
      {buttonText}
    </div>
  );
}
