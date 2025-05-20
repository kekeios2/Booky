"use client";

import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { toast } from "sonner";

interface LoginWithGoogleProps {
  callbackUrl?: string;
  className?: string;
}

export function LoginWithGoogle({
  callbackUrl = "/profile",
  className = "",
}: LoginWithGoogleProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true);

      // This will handle redirection automatically
      await signIn("google", {
        callbackUrl,
        redirect: true,
      });

      // The code below won't execute as the page will be redirected
    } catch (error) {
      console.error("Google sign in error:", error);
      toast.error("Failed to sign in with Google. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant="outline"
      type="button"
      onClick={handleGoogleSignIn}
      disabled={isLoading}
      className={`w-full flex items-center justify-center gap-2 ${className}`}
    >
      {isLoading ? (
        <>
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-r-transparent" />
          <span>Loading...</span>
        </>
      ) : (
        <>
          <FcGoogle className="h-5 w-5" />
          <span>Continue with Google</span>
        </>
      )}
    </Button>
  );
}
