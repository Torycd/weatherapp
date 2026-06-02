import { useState, useEffect } from "react";

function useUserLocation() {
  const [coords, setCoords] = useState(null);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    if (!navigator.geolocation) {
      setStatus("error");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoords({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
        setStatus("success");
      },
      (err) => {
        console.error(err);
        setStatus("error");
      },
    );
  }, []);

  return { coords, status };
}

export default useUserLocation;
