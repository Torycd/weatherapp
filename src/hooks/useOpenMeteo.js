import { useEffect, useReducer } from "react";

const initialValue = {
  isLoading: false,
  data: null,
  error: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true, error: null };
    case "api/success":
      return { ...state, isLoading: false, data: action.payload, error: null };
    case "api/error":
      return { ...state, isLoading: false, error: action.payload };
    default:
      return state;
  }
}

function useOpenMeteo(coords, retry) {
  const [{ isLoading, data, error }, dispatch] = useReducer(
    reducer,
    initialValue,
  );

  useEffect(() => {
    dispatch({ type: "loading" });
    const handleFetch = async () => {
      try {
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.lon}&hourly=temperature_2m&hourly=temperature_2m,relativehumidity_2m,precipitation,cloudcover,windspeed_10m&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,windspeed_10m_max&forecast_days=7&timezone=auto`,
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
        dispatch({ type: "api/success", payload: data });
        // console.log(data);
      } catch (err) {
        dispatch({ type: "api/error", payload: err.message });
      }
    };

    handleFetch();
  }, [coords, retry]);

  return { isLoading, data, error };
}

export default useOpenMeteo;
