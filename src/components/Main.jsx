import { useEffect, useState } from "react";
import useGeo from "../hooks/useGeo";
import useOpenMeteo from "../hooks/useOpenMeteo";

import SearchBar from "./SearchBar";
import Forecast from "./Forecast";
import ErrorPage from "./ErrorPage";

function Main() {
  const [coords, setCoords] = useState({ lat: 50.52, lon: 13.41 });
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [selected, setSelected] = useState(null);
  const [retry, setRetry] = useState(0);

  // Detect location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setCoords({
        lat: position.coords.latitude,
        lon: position.coords.longitude,
      });
    });
  }, []);

  // Debounce
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedQuery(query), 500);
    return () => clearTimeout(handler);
  }, [query]);

  // Hooks
  const { status: apiResponse, data } = useOpenMeteo(coords, retry);
  const { status, results } = useGeo(debouncedQuery, retry);

  // When user selects
  function handleSelect(r) {
    setSelected(r);
    if (r) setQuery(r.name);
  }

  // On Search button
  function handleSearch() {
    if (selected) {
      setCoords({ lat: selected.latitude, lon: selected.longitude });
    }
  }

  function handleRetry(){
    setRetry(retry + 1)
  }

  if (status === "error" || apiResponse === "error") return <ErrorPage handleRetry={handleRetry}  />;
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
          status={status}
          selected={selected}
          onSelect={handleSelect}
          onSearch={handleSearch}
        />
      </div>
      <div>
        <Forecast data={data} />
      </div>
    </div>
  );
}

export default Main;
