import { useEffect, useState } from "react";

import useGeo from "../hooks/useGeo";
import useOpenMeteo from "../hooks/useOpenMeteo";

function Main() {
  const [coords, setCoords] = useState({ lat: 50.52, lon: 13.41 });
  const [search, setSearch] = useState("");

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setCoords({
        lat: position.coords.latitude,
        lon: position.coords.longitude,
      });
    });
  }, []);

  const { data } = useOpenMeteo(coords);
  const { status, results, error } = useGeo(search);
  console.log(results);

  return (
    <div>
      <div>
        <h1 className="text-6xl text-center">How is the sky looking today?</h1>
      </div>
    </div>
  );
}

export default Main;
