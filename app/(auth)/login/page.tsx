"use client";
import Image from "next/image";
import dynamic from "next/dynamic";
import Loading from "@/app/loading";

const LoginForm = dynamic(() => import("@/components/auth/Login/LoginForm"), {
  loading: () => <Loading />,
});

export default function LoginPage() {
  return (
    <section className="relative flex min-h-screen bg-gradient-to-l from-[#090C15] to-[#080b18]">
      {/* Background Image on mobile - blurred */}
      <div className="absolute inset-0 md:hidden z-0">
        <Image
          src="/images/auth-illustration.jpg"
          alt="Books Background"
          fill
          className="object-cover opacity-10 blur-sm"
          priority
        />
      </div>

      <div className="flex flex-col md:flex-row w-full relative z-10">
        {/* Login Form Side */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-4 md:p-8">
          <div className="w-full max-w-md">
            <LoginForm />
          </div>
        </div>

        {/* Side Image - Desktop only */}
        <div className="hidden md:flex md:w-1/2 relative overflow-hidden">
          <Image
            src="/images/auth-illustration.jpg"
            alt="Books Collection"
            fill
            className="object-cover brightness-[.85]"
            sizes="(min-width: 768px) 50vw"
            priority
          />     
        </div>
      </div>
    </section>
  );
}
