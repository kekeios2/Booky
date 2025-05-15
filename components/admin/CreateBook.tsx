import Link from "next/link";
import React from "react";

const CreateBook = () => {
  return (
    <Link href={"/admin/books/new"}>
      <div className="bg-blue-900 w-[fit-content] text-gray-300 p-1.5 rounded-[10px]">
        + Create a New Book
      </div>
    </Link>
  );
};
export default CreateBook;
