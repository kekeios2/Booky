import Link from "next/link";
import React from "react";

export const CreateUserBtn = () => {
  return (
    <Link href={"/admin/Users/new"}>
      <div className="bg-blue-900 w-[fit-content] text-gray-300 p-1.5 rounded-[10px]">
        + Create a New User
      </div>
    </Link>
  );
};
