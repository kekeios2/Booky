// components/SendEmail.tsx - Fixed version
"use client";
import { useState } from "react";

export default function SendEmail({ email }: { email: string }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleClick = async () => {
    setIsLoading(true);
    setError(null);
    setSuccess(null);
    
    console.log("Attempting to resend verification email to:", email);
    
    try {
      const res = await fetch("/api/auth/resend-verification", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      
      console.log("Response status:", res.status);
      
      const data = await res.json();
      console.log("Response data:", data);
      
      if (!res.ok) {
        throw new Error(data.error || "Failed to send email");
      }
      
      setSuccess(data.message || "Verification email sent successfully");
    } catch (error) {
      console.error("Error sending verification email:", error);
      const errmsg = error instanceof Error ? error.message : "An unknown error occurred";
      setError(errmsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-4 mb-4">
      <button
        onClick={handleClick}
        disabled={isLoading}
        className="bg-[#c9af90] text-black px-4 py-1.5 rounded hover:bg-[#a79278] transition shadow-lg cursor-pointer text-sm disabled:opacity-50"
      >
        {isLoading ? "Sending..." : "Resend Verification Email"}
      </button>
      {error && <p className="text-red-400 text-xs mt-2">{error}</p>}
      {success && <p className="text-green-400 text-xs mt-2">{success}</p>}
    </div>
  );
}
