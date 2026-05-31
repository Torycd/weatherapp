import { useEffect, useReducer } from "react";

const initialValue = {
  isLoading: false,
  results: [],
  error: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true, error: null };
    case "api/success":
      return {
        ...state,
        isLoading: false,
        status: "success",
        results: action.payload,
        error: null,
      };
    case "api/error":
      return { ...state, isLoading: false, error: action.payload };
    default:
      return state;
  }
}

function useGeo(search, retry) {
  const [{ isLoading, results, error }, dispatch] = useReducer(
    reducer,
    initialValue,
  );
  useEffect(() => {
    const searchCity = async () => {
      dispatch({ type: "loading" });
      try {
        const response = await fetch(
          `https://geocoding-api.open-meteo.com/v1/search?name=${search}&count=10&language=en&format=json`,
        );
        if (!response.ok) throw new Error("Failed to fetch locations");

        const data = await response.json();
        dispatch({ type: "api/success", payload: data.results || [] });
      } catch (error) {
        dispatch({ type: "api/error", payload: error.message });
      }
    };
    searchCity();
  }, [search, retry]);

  return { isLoading, results, error };
}

export default useGeo;
