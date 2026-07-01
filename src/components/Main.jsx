import { memo, useEffect, useState } from "react";
import useGeo from "../hooks/useGeo";
import useOpenMeteo from "../hooks/useOpenMeteo";
import useUserLocation from "../hooks/useUserLocation";

import SearchBar from "./SearchBar";
import Forecast from "./Forecast";
import ErrorPage from "./ErrorPage";
import Spinner from "./features/Spinner";

function Main() {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [forecastCoords, setForecastCoords] = useState(null);
  const [retry, setRetry] = useState(0);

  const { coords: userCoords } = useUserLocation();

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);
    return () => clearTimeout(handler);
  }, [query]);
  
  const coords = forecastCoords ?? userCoords;
  const { data, isLoading } = useOpenMeteo(coords, retry);
  const {
    error,
    results,
    isLoading: isLoadingGeo,
  } = useGeo(debouncedQuery, retry);

  function handleSelect(place) {
    setQuery(place.name);
    setSelectedPlace({
      lat: place.latitude,
      lon: place.longitude,
    });
    setDebouncedQuery("");
  }

  function handleSearch() {
    if (!selectedPlace) return;
    setForecastCoords(selectedPlace);
    setQuery("");
    setDebouncedQuery("");
  }

  function handleRetry() {
    setRetry((r) => r + 1);
  }

  if (error) {
    return <ErrorPage handleRetry={handleRetry} />;
  }

  if (!coords) {
    return <Spinner />;
  }

  return (
    <div>
      <h1 className="text-5xl mt-2 font-bricolage text-center">
        How is the sky looking today?
      </h1>

      <div className="flex justify-center mt-4">
        <SearchBar
          query={query}
          setQuery={setQuery}
          results={results}
          onSelect={handleSelect}
          onSearch={handleSearch}
          isLoadingGeo={isLoadingGeo}
        />
      </div>

      {data && <Forecast data={data} isLoading={isLoading} />}
    </div>
  );
}

export default memo(Main);
