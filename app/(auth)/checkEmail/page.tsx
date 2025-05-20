// ✅ app/checkEmail/page.tsx

"use client"; // <== أضف هذه

import React, { Suspense } from "react";
import CheckEmail from "@/components/CheckEmail";
import { useSearchParams } from "next/navigation";

function CheckEmailWrapper() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  return <CheckEmail email={email} />;
}

export default function CheckEmailPage() {
  return (
    <Suspense fallback={<div> Loading...</div>}>
      <CheckEmailWrapper />
    </Suspense>
  );
}
