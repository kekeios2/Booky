// hooks/useLogin.ts
"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email format" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
});

export function useLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);

    try {
      loginSchema.pick({ [name]: true } as any).parse({ [name]: value });
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    } catch (err: any) {
      setErrors((prev) => ({ ...prev, [name]: err.errors[0].message }));
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

  return {
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
    togglePassword: () => setShowPassword((prev) => !prev),
  };
}
