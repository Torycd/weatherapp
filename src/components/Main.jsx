import useGeo from "../hooks/useGeo";
import useOpenMeteo from "../hooks/useOpenMeteo";

import { useState } from "react";

function Main() {
  const [query, setQuery] = useState("");

  const { data } = useOpenMeteo();
  const { status, results, error, searchCity } = useGeo();
  return (
    <div>
      <div>
        <h1>How is the sky looking today?</h1>
      </div>
    </div>
  );
}

export default Main;
