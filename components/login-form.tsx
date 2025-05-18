"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email format" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const { data, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();

  const errorParam = searchParams.get("error");
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const verified = searchParams.get("verified") === "true";

  useEffect(() => {
    if (status === "authenticated" && errorParam !== "OAuthCallback") {
      router.replace(callbackUrl);
    }
  }, [status, router, errorParam, callbackUrl]);

  const validateField = (field: string, value: string) => {
    try {
      loginSchema.pick({ [field]: true } as any).parse({ [field]: value });
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    } catch (err: any) {
      setErrors((prev) => ({ ...prev, [field]: err.errors[0].message }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const validation = loginSchema.safeParse({ email, password });

    if (!validation.success) {
      const formattedErrors: { email?: string; password?: string } = {};
      validation.error.errors.forEach((err) => {
        formattedErrors[err.path[0] as "email" | "password"] = err.message;
      });
      setErrors(formattedErrors);
      setIsLoading(false);
      return;
    }

    try {
      const signInData = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (signInData?.error) {
        if (signInData.error === "CredentialsSignin") {
          setError("Invalid email or password. Please try again.");
        } else {
          setError(signInData.error || "Login failed. Please try again.");
        }
        setIsLoading(false);
      } else {
        await new Promise((resolve) => setTimeout(resolve, 300));

        const sessionRes = await fetch("/api/auth/session");
        const sessionJson = await sessionRes.json();

        console.log("User role after login:", sessionJson?.user?.role);

        if (sessionJson?.user?.role === "Admin") {
          router.push("/admin");
        } else {
          router.push("/");
        }
        if (sessionJson?.user?.active === false) {
          router.push("/check-email?email=" + email);
        }
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("An unexpected error occurred. Please try again.");
      setIsLoading(false);
    }
  };

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-200"></div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-l from-[#12141D] to-[#12151F] rounded-lg shadow-xl p-6 md:p-8 w-full">
      <Link href={"/"}>
        <div className="flex items-center gap-2 mb-6">
          <Image
            src="/images/logo.svg"
            alt={"img"}
            width={30}
            height={30}
          ></Image>
          <span className="font-bold text-xl text-white">Booky</span>
        </div>
      </Link>

      <div className="mb-6">
        <h2 className="text-xl font-bold text-white">Welcome Back to Booky</h2>
        <p className="text-gray-400 text-sm">
          Access the vast collection of resources, and stay updated
        </p>
      </div>
      {verified && (
        <div className="bg-[#1F2937] border border-green-100 text-green-400 px-4 py-3 rounded mb-4">
          Woohoo! Your email is officially verified. Time to strut your stuff
          and log in!
        </div>
      )}

      {(error || errorParam) && (
        <div className="mb-4 p-3 bg-red-900/30 border border-red-800 rounded-md text-red-200 text-sm">
          {error ||
            (errorParam === "OAuthCallback"
              ? "Authentication failed. Please try again."
              : errorParam)}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-400"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              validateField("email", e.target.value);
            }}
            placeholder="user@example.com"
            className={`mt-1 block w-full rounded-md bg-[#1F2937] border ${
              errors.email ? "border-red-500 animate-shake" : "border-gray-700"
            } text-white shadow-sm px-3 py-2 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
          />
          {errors.email && (
            <p className="text-red-400 text-xs mt-1">{errors.email}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-400"
          >
            Password
          </label>
          <div className="mt-1 relative">
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                validateField("password", e.target.value);
              }}
              placeholder="At least 8 characters long"
              className={`block w-full rounded-md bg-[#1F2937] border ${
                errors.password
                  ? "border-red-500 animate-shake"
                  : "border-gray-700"
              } text-white shadow-sm px-3 py-2 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOffIcon className="h-5 w-5 text-gray-400" />
              ) : (
                <EyeIcon className="h-5 w-5 text-gray-400" />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="text-red-400 text-xs mt-1">{errors.password}</p>
          )}
        </div>

        <div>
          <button
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
          </button>
        </div>
      </form>

      <div className="mt-4 text-center">
        <p className="text-sm text-gray-400">
          Don't have an account already?
          <Link
            href="/register"
            className="text-[#97846d] hover:text-[#6e604f]"
          >
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}

function EyeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
  );
}

function EyeOffIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
      />
    </svg>
  );
}
