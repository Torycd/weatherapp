import React from "react";

const Parameter = ({
  currentHumidity,
  currentTemp,
  currentWind,
  currentPrecip,
}) => {
  return (
    <div className="grid grid-cols-4 gap-8 mt-4">
      <div className="col-span-1 rounded-md bg-blue-900 opacity-75 p-4">
        <h1 className="">Feels like</h1>
        <h1 className="text-3xl">
          {currentTemp}
          {"\u00B0"}
        </h1>
      </div>
      <div className="col-span-1 rounded-md bg-blue-900 opacity-75 p-4">
        <h1 className="">Humidity</h1>
        <h1 className="text-3xl">{currentHumidity}%</h1>
      </div>
      <div className="col-span-1 rounded-md bg-blue-900 opacity-75 p-4">
        <h1 className="">Wind</h1>
        <h1 className="text-3xl">{currentWind} mph</h1>
      </div>
      <div className="col-span-1 rounded-md bg-blue-900 opacity-75 p-4">
        <h1 className="">precipitation</h1>
        <h1 className="text-3xl">{currentPrecip} in</h1>
      </div>
    </div>
  );
};

export default Parameter;
