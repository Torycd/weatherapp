import { useEffect, useReducer } from "react";

const initialValue = {
  status: "",
  results: [],
  error: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "start":
      return { ...state, status: "loading", error: null };
    case "success":
      return { status: "success", results: action.payload, error: null };
    case "error":
      return { ...state, status: "error", error: action.payload };
    default:
      return state;
  }
}

function useGeo(search) {
  const [{ status, results, error }, dispatch] = useReducer(
    reducer,
    initialValue
  );
  useEffect(() => {
    const searchCity = async () => {
      dispatch({ type: "start" });
      try {
        const res = await fetch(
          `https://geocoding-api.open-meteo.com/v1/search?name=${search}&count=10&language=en&format=json`
        );
        if (!res.ok) throw new Error("Failed to fetch locations");
        const data = await res.json();
        //   console.log(data)
        dispatch({ type: "success", payload: data.results || [] });
      } catch (err) {
        dispatch({ type: "error", payload: err.message });
      }
    };
    searchCity();
  }, [search]);

  return { status, results, error };
}

export default useGeo;
