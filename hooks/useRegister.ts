// hooks/useRegister.ts
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";

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

export function useRegister() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    univId: "",
  });
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePassword = () => setShowPassword((prev) => !prev);
  const toggleConfirmPassword = () => setShowConfirmPassword((prev) => !prev);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    validateField(name, value);
  };

  const validateField = (field: string, value: string) => {
    if (field === "confirmPassword") {
      if (value !== formData.password) {
        setErrors((prev) => ({ ...prev, [field]: "Passwords do not match" }));
      } else {
        setErrors((prev) => ({ ...prev, [field]: undefined }));
      }
      return;
    }

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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          fullName: formData.fullName,
          password: formData.password,
          univId: Number(formData.univId),
        }),
      });

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

  return {
    formData,
    errors,
    error,
    isSubmitting,
    showPassword,
    showConfirmPassword,
    togglePassword,
    toggleConfirmPassword,
    handleChange,
    handleSubmit,
  };
}
