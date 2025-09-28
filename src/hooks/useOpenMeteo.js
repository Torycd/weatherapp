import { useEffect, useReducer } from "react";

const initialValue = {
  status: "", // "loading", "success", "error"
  data: null,
  error: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "start":
      return { ...state, status: "loading", error: null };
    case "success":
      return { status: "success", data: action.payload, error: null };
    case "error":
      return { ...state, status: "error", error: action.payload };
    default:
      return state;
  }
}

function useOpenMeteo() {
  const [{ status, data, error }, dispatch] = useReducer(reducer, initialValue);

  useEffect(() => {
    dispatch({ type: "start" });

    const handleFetch = async () => {
      try {
        const response = await fetch(
          "https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m"
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        dispatch({ type: "success", payload: data });
        console.log(data);
      } catch (err) {
        dispatch({ type: "error", payload: err.message });
      }
    };

    handleFetch();
  }, []);

  return { status, data, error };
}

export default useOpenMeteo;
