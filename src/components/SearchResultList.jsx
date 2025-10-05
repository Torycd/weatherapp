function SearchResultList({ results, onSelect }) {
  return (
    <ul className="absolute top-12 left-0 min-w-[400px] bg-blue-900 rounded-md shadow-lg max-h-60 overflow-y-auto z-10">
      {results.map((r) => (
        <li
          key={r.id}
          onClick={() => onSelect(r)}
          className="px-4 py-2 hover:bg-blue-700 cursor-pointer"
        >
          {r.name}, {r.country}{" "}
          <span className="text-sm opacity-70">
            ({r.latitude.toFixed(2)}, {r.longitude.toFixed(2)})
          </span>
        </li>
      ))}
    </ul>
  );
}

export default SearchResultList;
