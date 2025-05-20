// components/search/SearchPage.tsx
"use client";

import { useSearch } from "@/hooks/useSearch";
import SearchHeader from "./SearchHeader";
import SearchBar from "./SearchBar";
import SearchResults from "./SearchResults";

const SearchPage = () => {
  const search = useSearch();

  return (
    <div>
      <div className="min-h-screen text-white p-8">
        <SearchHeader />
        <SearchBar {...search} />
        <SearchResults {...search} />
      </div>
    </div>
  );
};

export default SearchPage;
