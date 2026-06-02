import { memo, useEffect, useState } from "react";
import useGeo from "../hooks/useGeo";
import useOpenMeteo from "../hooks/useOpenMeteo";
import useUserLocation from "../hooks/useUserLocation";

import SearchBar from "./SearchBar";
import Forecast from "./Forecast";
import ErrorPage from "./ErrorPage";

function Main() {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [selected, setSelected] = useState(null);
  const [retry, setRetry] = useState(0);

  const { coords: userCoords, status } = useUserLocation();

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedQuery(query), 500);
    return () => clearTimeout(handler);
  }, [query]);

  // FINAL COORDS LOGIC
  const coords = selected ?? userCoords;

  const { data, isLoading } = useOpenMeteo(coords, retry);
  const { error, results } = useGeo(debouncedQuery, retry);

  function handleSelect(r) {
    setSelected({
      lat: r.latitude,
      lon: r.longitude,
    });
    setQuery(r.name);
  }

  function handleRetry() {
    setRetry((r) => r + 1);
  }

  if (error) {
    return <ErrorPage handleRetry={handleRetry} />;
  }

  // 🔥 IMPORTANT: wait for location first
  if (!coords) {
    return (
      <div className="text-center mt-10 text-xl">
        Detecting your location...
      </div>
    );
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
          isLoading={isLoading}
          onSelect={handleSelect}
        />
      </div>

      {<Forecast data={data} isLoading={isLoading} />}
    </div>
  );
}

export default memo(Main);
