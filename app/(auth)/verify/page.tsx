// app/verify/page.tsx
import dynamic from "next/dynamic";
import { Suspense } from "react";

const VerifyContent = dynamic(() => import("@/components/VerifyContent"));

export default function VerifyPage() {
  return (
    <Suspense fallback={<div className="text-white p-10 text-center">Loading...</div>}>
      <VerifyContent />
    </Suspense>
  );
}
