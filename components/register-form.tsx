// components\register-form.tsx
"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { z } from "zod";
import { LoginWithGoogle } from "./LoginWithGoogle";

const registerSchema = z
  .object({
    fullName: z
      .string()
      .min(2, { message: "Name must be at least 2 characters" }),
    email: z.string().email({ message: "Invalid email format" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
    confirmPassword: z.string(),
    univId: z.string().refine((val) => !isNaN(Number(val)), {
      message: "University ID must be a number",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export default function RegisterForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    univId: "",
  });
  const [errors, setErrors] = useState<{
    fullName?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    univId?: string;
  }>({});
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateField = (field: string, value: string) => {
    // Handle confirmPassword validation separately
    if (field === "confirmPassword") {
      if (value !== formData.password) {
        setErrors((prev) => ({ ...prev, [field]: "Passwords do not match" }));
      } else {
        setErrors((prev) => ({ ...prev, [field]: undefined }));
      }
      return;
    }

    // Create a partial schema for the specific field
    let fieldSchema;
    switch (field) {
      case "fullName":
        fieldSchema = z
          .string()
          .min(2, { message: "Name must be at least 2 characters" });
        break;
      case "email":
        fieldSchema = z.string().email({ message: "Invalid email format" });
        break;
      case "password":
        fieldSchema = z
          .string()
          .min(8, { message: "Password must be at least 8 characters" });
        break;
      case "univId":
        fieldSchema = z.string().refine((val) => !isNaN(Number(val)), {
          message: "University ID must be a number",
        });
        break;
      default:
        return;
    }

    // Validate the field
    try {
      fieldSchema.parse(value);
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    } catch (err: any) {
      if (err instanceof z.ZodError) {
        setErrors((prev) => ({ ...prev, [field]: err.errors[0].message }));
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    // Validate all fields with Zod
    const validation = registerSchema.safeParse(formData);

    if (!validation.success) {
      const formattedErrors: any = {};
      validation.error.errors.forEach((err) => {
        formattedErrors[err.path[0]] = err.message;
      });
      setErrors(formattedErrors);
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          fullName: formData.fullName,
          password: formData.password,
          univId: Number(formData.univId),
        }),
      });

      // Handle responses
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "Registration failed");
      }
      router.push("/checkEmail?email=" + formData.email);
    } catch (err) {
      console.error("Registration error:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Registration failed. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    validateField(name, value);
  };

  return (
    <div className="bg-gradient-to-l from-[#12141D] to-[#12151F] rounded-lg shadow-xl p-6 md:p-8 w-full">
      {/* Logo */}
      <Link href={"/"}>
        <div className="flex items-center gap-2 mb-6">
          <Image
            src="/images/logo.svg"
            alt="Booky Logo"
            width={30}
            height={30}
          />
          <span className="font-bold text-xl text-white">Booky</span>
        </div>
      </Link>

      {/* Welcome Text */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-white">
          Create Your Library Account
        </h2>
        <p className="text-gray-400 text-sm">
          Please complete all fields to register for library access
        </p>
      </div>

      {/* Error message */}
      {error && (
        <div className="mb-4 p-3 bg-red-900/30 border border-red-800 rounded-md text-red-200 text-sm">
          {error}
        </div>
      )}

      {/* Registration Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Full Name */}
        <div>
          <label
            htmlFor="fullName"
            className="block text-sm font-medium text-gray-400"
          >
            Full Name
          </label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            required
            value={formData.fullName}
            onChange={handleChange}
            placeholder="John Doe"
            className={`mt-1 block w-full rounded-md bg-[#1F2937] border ${
              errors.fullName
                ? "border-red-500 animate-shake"
                : "border-gray-700"
            } text-white shadow-sm px-3 py-2 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
          />
          {errors.fullName && (
            <p className="text-red-400 text-xs mt-1">{errors.fullName}</p>
          )}
        </div>

        {/* Email */}
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
            required
            value={formData.email}
            onChange={handleChange}
            placeholder="user@example.com"
            className={`mt-1 block w-full rounded-md bg-[#1F2937] border ${
              errors.email ? "border-red-500 animate-shake" : "border-gray-700"
            } text-white shadow-sm px-3 py-2 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
          />
          {errors.email && (
            <p className="text-red-400 text-xs mt-1">{errors.email}</p>
          )}
        </div>

        {/* University ID */}
        <div>
          <label
            htmlFor="univId"
            className="block text-sm font-medium text-gray-400"
          >
            University ID
          </label>
          <input
            id="univId"
            name="univId"
            type="text"
            required
            value={formData.univId}
            onChange={handleChange}
            placeholder="12345678"
            className={`mt-1 block w-full rounded-md bg-[#1F2937] border ${
              errors.univId ? "border-red-500 animate-shake" : "border-gray-700"
            } text-white shadow-sm px-3 py-2 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
          />
          {errors.univId && (
            <p className="text-red-400 text-xs mt-1">{errors.univId}</p>
          )}
        </div>

        {/* Password */}
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
              required
              value={formData.password}
              onChange={handleChange}
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
                <EyeOffIcon className="w-5 h-5 text-gray-400" />
              ) : (
                <EyeIcon className="w-5 h-5 text-gray-400" />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="text-red-400 text-xs mt-1">{errors.password}</p>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-gray-400"
          >
            Confirm Password
          </label>
          <div className="mt-1 relative">
            <input
              id="confirmPassword"
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              required
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Re-enter your password"
              className={`block w-full rounded-md bg-[#1F2937] border ${
                errors.confirmPassword
                  ? "border-red-500 animate-shake"
                  : "border-gray-700"
              } text-white shadow-sm px-3 py-2 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? (
                <EyeOffIcon className="w-5 h-5 text-gray-400" />
              ) : (
                <EyeIcon className="w-5 h-5 text-gray-400" />
              )}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-red-400 text-xs mt-1">
              {errors.confirmPassword}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <div>
          <Button
            type="submit"
            disabled={
              isSubmitting ||
              Object.values(errors).some((error) => error !== undefined)
            }
            className="w-full btn-primary text-black font-medium rounded-md py-2 px-4 mt-4 hover:bg-[#96826b] focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-colors disabled:opacity-70"
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin h-5 w-5 mr-2 border-2 border-white border-t-transparent rounded-full"></div>
                <span>Registering...</span>
              </div>
            ) : (
              "Register"
            )}
          </Button>
        </div>
      </form>

      <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border my-4">
        <span className="relative z-10 bg-[#12151F] px-2 text-muted-foreground">
          Or Register with
        </span>
      </div>

      {/* Social Login Buttons */}
      <div className="grid grid-cols-1 gap-4">
        <LoginWithGoogle />
      </div>
      {/* Login link */}
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-400">
          Already have an account?
          <Link
            href="/login"
            className="text-[#97846d] hover:text-[#6e604f] pl-1"
          >
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}

// Icon components
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
