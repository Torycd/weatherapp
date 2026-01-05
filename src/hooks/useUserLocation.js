import { useState, useEffect } from "react";

function useUserLocation() {
  const [coords, setCoords] = useState(null);
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    if (!navigator.geolocation) {
      setStatus("error");
      return;
    }

    setStatus("loading");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoords({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
        setStatus("success");
      },
      () => {
        setStatus("error");
      }
    );
  }, []);

  return { coords, status };
}

export default useUserLocation;
