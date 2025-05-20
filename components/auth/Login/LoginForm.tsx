// components/login/LoginForm.tsx
"use client";

import LoginHeader from "./LoginHeader";
import LoginFields from "./LoginFields";
import { Button } from "@/components/ui/button";
import { useLogin } from "@/hooks/useLogin";
import Link from "next/link";

export default function LoginForm() {
  const {
    email,
    password,
    errors,
    error,
    isLoading,
    showPassword,
    verified,
    errorParam,
    handleChange,
    handleSubmit,
    togglePassword,
  } = useLogin();

  return (
    <div className="bg-gradient-to-l from-[#12141D] to-[#12151F] rounded-lg shadow-xl p-6 md:p-8 w-full">
      <LoginHeader verified={verified} />

      {(error || errorParam) && (
        <div className="mb-4 p-3 bg-red-900/30 border border-red-800 rounded-md text-red-200 text-sm">
          {errorParam === "OAuthCallback"
            ? "Authentication failed. Please try again."
            : error || errorParam}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <LoginFields
          email={email}
          password={password}
          errors={errors}
          showPassword={showPassword}
          _isLoading={isLoading}
          handleChange={handleChange}
          togglePassword={togglePassword}
        />

        <Button
          type="submit"
          disabled={isLoading || !!errors.email || !!errors.password}
          className="w-full btn-primary text-black font-medium rounded-md py-2 px-4 mt-4 hover:bg-[#96826b] focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-colors disabled:opacity-70"
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin h-5 w-5 mr-2 border-2 border-white border-t-transparent rounded-full"></div>
              <span>Logging in...</span>
            </div>
          ) : (
            "Login"
          )}
        </Button>
      </form>
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-400">
          Don't have an account?
          <Link
            href="/register"
            className="text-[#97846d] hover:text-[#6e604f] pl-1"
          >
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}
