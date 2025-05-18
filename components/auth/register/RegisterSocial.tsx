// components/register/RegisterSocial.tsx
import { LoginWithGoogle } from "@/components/LoginWithGoogle";
import Link from "next/link";

export default function RegisterSocial() {
  return (
    <>
      <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border my-4">
        <span className="relative z-10 bg-[#12151F] px-2 text-muted-foreground">
          Or Register with
        </span>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <LoginWithGoogle />
      </div>

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
    </>
  );
}
