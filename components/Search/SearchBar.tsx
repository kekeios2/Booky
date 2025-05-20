// components/search/SearchBar.tsx
interface Props {
  searchQuery: string;
  selectedCategory: string;
  sortOrder: string;
  categories: string[];
  setSearchQuery: (v: string) => void;
  setSelectedCategory: (v: string) => void;
  setSortOrder: (v: string) => void;
  handleSearch: (e: React.FormEvent) => void;
}

export default function SearchBar({
  searchQuery,
  selectedCategory,
  sortOrder,
  categories,
  setSearchQuery,
  setSelectedCategory,
  setSortOrder,
  handleSearch,
}: Props) {
  return (
    <form onSubmit={handleSearch} className="max-w-2xl mx-auto mt-8">
      <div className="relative flex items-center">
        <input
          type="text"
          placeholder="Search by title, author, or genre..."
          className="w-full py-3 pl-4 pr-4 bg-gray-800 border-none rounded-md focus:outline-none focus:ring-2 focus:ring-[#c9af90]"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
          type="submit"
          disabled={searchQuery.trim() === ""}
          className={`ml-2 px-4 py-3 font-medium rounded-md transition ${
            searchQuery.trim() === ""
              ? "bg-[#5e524479] text-white cursor-not-allowed"
              : "bg-[#c9af90] text-black hover:bg-[#a79176]"
          }`}
        >
          Search
        </button>
      </div>

      <div className="flex flex-wrap justify-center gap-4 mt-6">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="bg-gray-800 text-white px-4 py-2 rounded-md"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="bg-gray-800 text-white px-4 py-2 rounded-md"
        >
          <option value="default">Sort By</option>
          <option value="highest">Highest Rated</option>
          <option value="lowest">Lowest Rated</option>
        </select>
      </div>
    </form>
  );
}
