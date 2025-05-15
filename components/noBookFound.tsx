import React from "react";
import Image from "next/image";
const noBookFound = () => {
  return (
    <div className="text-center py-16">
      <Image
        src="/images/Mask.png"
        alt="No results found"
        width={200}
        height={200}
        className="justify-self-center"
      />
      <h3 className="text-2xl font-semibold my-4">No Results Found</h3>
      <p className="text-gray-400 mb-2">
        We couldn't find any books matching your search.
      </p>
      <p className="text-gray-400">
        Try using different keywords or check for typos.
      </p>
    </div>
  );
};

export default noBookFound;
