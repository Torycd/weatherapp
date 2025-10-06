import SearchIcon from "../assets/images/icon-search.svg?react";
import SearchResultList from "./SearchResultList";

function SearchBar({
  query,
  setQuery,
  results,
  status,
  selected,
  onSelect,
  onSearch,
}) {
  return (
    <div className="flex gap-4 relative">
      {/* Input */}
      <div className="bg-blue-900 opacity-75 rounded-md flex min-w-[400px] items-center px-3 ">
        <SearchIcon className="w-6 h-6" />
        <input
          value={query}
          placeholder="Search for a place..."
          className="py-2 px-4 outline-none bg-transparent w-full"
          onChange={(e) => {
            setQuery(e.target.value);
            onSelect(null); // reset selection when typing
          }}
        />
      </div>
      <button onClick={onSearch} className="bg-blue-800 rounded-md py-2 px-4">
        Search
      </button>

      {/* Dropdown results */}
      {status === "success" && results.length > 0 && query && !selected && (
        <SearchResultList results={results} onSelect={onSelect} />
      )}
    </div>
  );
}

export default SearchBar;
