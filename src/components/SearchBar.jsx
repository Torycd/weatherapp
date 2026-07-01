import { memo } from "react";

import SearchIcon from "../assets/images/icon-search.svg?react";
import SearchResultList from "./SearchResultList";

function SearchBar({
  query,
  setQuery,
  results,
  onSelect,
  onSearch,
  isLoadingGeo,
}) {
  return (
    <div className="flex gap-4 relative">
      <div className="bg-blue-900 opacity-75 rounded-md flex min-w-[400px] items-center px-3">
        <SearchIcon className="w-6 h-6" />

        <input
          value={query}
          placeholder="Search for a place..."
          className="py-2 px-4 outline-none bg-transparent w-full"
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <button
        onClick={onSearch}
        disabled={!query || isLoadingGeo}
        className="bg-blue-800 rounded-md py-2 px-4 hover:bg-blue-900 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Search
      </button>

      {results.length > 0 && query && (
        <SearchResultList results={results} onSelect={onSelect} />
      )}
    </div>
  );
}

export default memo(SearchBar);
