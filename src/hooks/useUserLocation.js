import { useState, useEffect } from "react";

const DEFAULTCOORDS = { lat: 52.52, lon: 13.41 };

function useUserLocation() {
  const [coords, setCoords] = useState(DEFAULTCOORDS);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setCoords({
        lat: position.coords.latitude,
        lon: position.coords.longitude,
      });
    });
  }, []);
  return { coords };
}

export default useUserLocation;
