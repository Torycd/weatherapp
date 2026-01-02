import React from "react";

const FirstLook = ({ svgBackground, data, daily, weatherLogo, hourly }) => {
  return (
    <div className="relative inline-block">
      <img
        src={svgBackground}
        alt="Weather background"
        className="w-full h-auto object-cover"
      />
      <div className="absolute inset-0 flex justify-between items-center p-6">
        <div>
          <h1 className="font-bold text-3xl">
            {data ? data.timezone.split("/").join(", ") : "Berlin, Germany"}
          </h1>
          <p>
            {new Date(daily.time[0]).toLocaleDateString("en-US", {
              weekday: "long",
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </p>
        </div>
        <div className="flex">
          <img src={weatherLogo} className="w-24" alt="data" />
          <h1 className="text-8xl ">
            {hourly.temperature_2m[0]}
            {"\u00B0"}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default FirstLook;
