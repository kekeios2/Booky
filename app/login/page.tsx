// app/login/page.tsx
import { Suspense } from "react";
import { LoginForm } from "@/components/login-form";
import Image from "next/image";

export default function LoginPage() {
  return (
    <section className="bg-gradient-to-l from-[#090C15] to-[#080b18] flex min-h-screen">
      <div className="flex flex-col md:flex-row w-full">
        {/* Login Form Side - 50% width */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-4 md:p-8">
          <div className="w-full max-w-md">
            <Suspense fallback={<div className="text-white">Loading...</div>}>
              <LoginForm />
            </Suspense>
          </div>
        </div>

        {/* Image Side - 50% width */}
        <div className="hidden md:block md:w-1/2 relative">
          <div className="absolute inset-0">
            <Image
              src="/images/auth-illustration.jpg"
              alt="Books Collection"
              fill
              className="object-cover"
              priority
              sizes="50vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
