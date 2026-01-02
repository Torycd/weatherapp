import React from "react";

const Daily = ({ daily, weatherLogo }) => {
  return (
    <div className="mt-5">
      <h1 className="font-bold">Daily Forecast</h1>

      <ul className="flex justify-between gap-4">
        {daily.time.map((time, index) => {
          return (
            <li className="rounded-md bg-blue-900 opacity-75 p-4 flex flex-col justify-between">
              <h1 className="text-center">
                {new Date(daily.time[index]).toLocaleDateString("en-US", {
                  weekday: "short",
                })}
              </h1>
              <img src={weatherLogo} className="w-24" alt="data" />
              <div className="flex justify-between text-[10px]">
                <h1>
                  {daily.temperature_2m_max[index]}
                  {"\u00B0"}
                </h1>
                <h1>
                  {daily.temperature_2m_min[index]}
                  {"\u00B0"}
                </h1>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Daily;
