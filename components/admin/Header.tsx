"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

type SidebarProps = {
  adminName: string | undefined;
};

export function Header({ adminName }: SidebarProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (query.trim()) {
        fetch(`/api/search?q=${query}`)
          .then((res) => res.json())
          .then((data) => setResults(data));
      } else {
        setResults([]);
      }
    }, 400);

    return () => clearTimeout(timeout);
  }, [query]);

  const handleSelect = (item: any) => {
    if (item.type === "book") {
      router.push(`/books/${item.id}`);
    } else if (item.type === "user") {
      router.push(`/admin/Users`);
    }
  };

  return (
    <div className="flex items-center justify-between mb-6 relative">
      <div>
        <h2 className="text-xl font-bold text-gray-800 flex">
          Welcome, <p className="ml-1 uppercase">{adminName}</p>
        </h2>
        <p className="text-sm text-gray-500">
          Monitor all of your projects and tasks here
        </p>
      </div>

      <div className="relative w-80">
        <input
          type="text"
          placeholder="Search users, books by title, author, or genre."
          className="px-4 py-2 border border-gray-200 rounded-lg text-sm w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        {results.length > 0 && (
          <ul className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-md mt-2 z-50 max-h-60 overflow-y-auto text-sm">
            {results.map((item) => (
              <li
                key={item.id}
                onClick={() => handleSelect(item)}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex justify-between items-center"
              >
                <span>{item.title || item.fullName || item.email}</span>
                <span className="text-xs text-gray-400">{item.type}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
