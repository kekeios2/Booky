// app/verify/page.tsx
"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function VerifyPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("");
  
  useEffect(() => {
    async function verifyToken() {
      if (!token) {
        console.error("No token provided");
        setStatus("error");
        setMessage("No verification token provided");
        return;
      }
      
      try {
        console.log("Verifying token:", token);
        
        // Call the verify API endpoint
        const response = await fetch(`/api/auth/verify?token=${token}`, {
          // Add cache: 'no-store' to prevent caching issues
          cache: 'no-store',
          // Include redirect: 'manual' to handle redirects ourselves
          redirect: 'follow'
        });
        
        console.log("API response status:", response.status);
        
        // If the API redirects, follow the redirect
        if (response.redirected) {
          console.log("Redirected to:", response.url);
          router.push(response.url);
          return;
        }
        
        // If not redirected, handle the response
        const data = await response.json().catch(() => ({}));
        
        if (!response.ok) {
          console.error("Verification failed:", data.error);
          setStatus("error");
          setMessage(data.error || "Verification failed");
        } else {
          console.log("Verification successful");
          setStatus("success");
          setMessage("Email verified successfully!");
          // Redirect to login after a short delay
          setTimeout(() => {
            router.push("/login?verified=true");
          }, 2000);
        }
      } catch (error) {
        console.error("Verification error:", error);
        setStatus("error");
        setMessage("An error occurred during verification. Please try again later.");
      }
    }
    
    verifyToken();
  }, [token, router]);
  
  return (
    <section>
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
    </section>
  );
}
