import { memo, useEffect, useState } from "react";
import useGeo from "../hooks/useGeo";
import useOpenMeteo from "../hooks/useOpenMeteo";
import useUserLocation from "../hooks/useUserLocation";

import SearchBar from "./SearchBar";
import Forecast from "./Forecast";
import ErrorPage from "./ErrorPage";

function Main() {
  const [coords, setCoords] = useState(null);
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [selected, setSelected] = useState(null);
  const [retry, setRetry] = useState(0);

  // User location
  const { coords: userCoords } = useUserLocation();

  // When geolocation resolves
  useEffect(() => {
    if (userCoords) setCoords(userCoords);
  }, [userCoords]);

  // Debounce
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedQuery(query), 500);
    return () => clearTimeout(handler);
  }, [query]);

  // Hooks (guarded)
  const { data } = useOpenMeteo(coords, retry);
  const { error, results } = useGeo(debouncedQuery, retry);

  function handleSelect(r) {
    setSelected(r);
    if (r) setQuery(r.name);
  }

  function handleSearch() {
    if (selected) {
      setCoords({ lat: selected.latitude, lon: selected.longitude });
    }
  }

  function handleRetry() {
    setRetry((r) => r + 1);
  }

  if (error) {
    return <ErrorPage handleRetry={handleRetry} />;
  }

  return (
    <div>
      <h1 className="text-6xl mt-5 font-bricolage text-center">
        How is the sky looking today?
      </h1>

      <div className="flex justify-center mt-4">
        <SearchBar
          query={query}
          setQuery={setQuery}
          results={results}
          selected={selected}
          onSelect={handleSelect}
          onSearch={handleSearch}
        />
      </div>

      <Forecast data={data} isCoordsReady={!!coords} />
    </div>
  );
}

export default memo(Main);
