// app/verify/VerifyContent.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function VerifyContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function verifyToken() {
      if (!token) {
        setStatus("error");
        setMessage("No verification token provided");
        return;
      }

      try {
        const response = await fetch(`/api/auth/verify?token=${token}`, {
          cache: "no-store",
          redirect: "follow",
        });

        if (response.redirected) {
          router.push(response.url);
          return;
        }

        const data = await response.json().catch(() => ({}));

        if (!response.ok) {
          setStatus("error");
          setMessage(data.error || "Verification failed");
        } else {
          setStatus("success");
          setMessage("Email verified successfully!");
          setTimeout(() => {
            router.push("/login?verified=true");
          }, 2000);
        }
      } catch (error) {
        setStatus("error");
        setMessage("An error occurred during verification. Please try again later.");
      }
    }

    verifyToken();
  }, [token, router]);

  return (
    <div
      className="min-h-screen flex flex-col justify-center items-center text-white px-4"
      style={{
        backgroundImage:
          "url('https://ik.imagekit.io/xt6hfeibgz/Ui-Images/EXPORT-BG.png?updatedAt=1747251088255')",
        backgroundSize: "cover",
      }}
    >
      {status === "loading" && (
        <>
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mb-4"></div>
          <h2 className="text-xl font-semibold">Verifying your email...</h2>
        </>
      )}
      {status === "success" && (
        <>
          <div className="text-6xl mb-4">✓</div>
          <h2 className="text-xl font-semibold mb-2">Email Verified!</h2>
          <p className="text-center text-gray-300 max-w-xs mb-6">
            Your account has been activated. Redirecting to login...
          </p>
        </>
      )}
      {status === "error" && (
        <>
          <div className="text-6xl mb-4">✕</div>
          <h2 className="text-xl font-semibold mb-2">Verification Failed</h2>
          <p className="text-center text-gray-300 max-w-xs mb-6">{message}</p>
          <button
            onClick={() => router.push("/login")}
            className="bg-[#c9af90] text-black px-6 py-2 rounded hover:bg-[#a79278] transition shadow-lg cursor-pointer"
          >
            Go to Login
          </button>
        </>
      )}
    </div>
  );
}
