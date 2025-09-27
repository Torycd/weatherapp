import React from "react";
import NavBar from "./components/NavBar";
import Main from "./components/Main";

const App = () => {
  return (
    <div className="px-24 py-8 bg-neutral-800 min-h-dvh text-[18px] text-white">
      <NavBar />
      <Main />
    </div>
  );
};

export default App;
