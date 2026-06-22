import React from "react";
import NavBar from "./components/NavBar";
import Main from "./components/Main";

const App = () => {
  return (
    <div className="sm:px-[240px] py-4 bg-blue-950 text-[18px] text-white h-screen">
      <NavBar />
      <Main />
    </div>
  );
};

export default App;
