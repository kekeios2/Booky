import { Button } from "@/components/ui/button";
import { LuMoveLeft } from "react-icons/lu";

import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <>
      <Button className="w-[fit-content]" asChild>
        <Link href={"/admin/Users"}> <LuMoveLeft/>Go Back </Link>
      </Button>

      <section className="w-full max-w-2xl">
        <form action="/" method="POST"></form>
      </section>
    </>
  );
};
export default page;
