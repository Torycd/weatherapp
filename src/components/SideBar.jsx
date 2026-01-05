import sunny from "../assets/images/icon-sunny.webp";
import rain from "../assets/images/icon-rain.webp";
import drizzle from "../assets/images/icon-drizzle.webp";
import snow from "../assets/images/icon-snow.webp";
import fog from "../assets/images/icon-fog.webp";
import overcast from "../assets/images/icon-overcast.webp";
import partlyCloudy from "../assets/images/icon-partly-cloudy.webp";
import storm from "../assets/images/icon-storm.webp";
import dropdownIcon from "../assets/images/icon-dropdown.svg";

import { getWeatherCondition } from "../utils/weatherCondition";

const conditionToSvg = {
  sunny,
  rain,
  drizzle,
  snow,
  fog,
  overcast,
  "partly-cloudy": partlyCloudy,
  storm,
};

const SideBar = ({ daily, hourly, isLoading }) => {
  // Drive map safely during loading
  const hoursToRender = isLoading ? Array.from({ length: 8 }) : hourly.time;

  return (
    <div className="col-span-2 bg-blue-900 flex flex-col justify-between rounded-lg p-3">
      <div className="flex justify-between mb-1">
        <h1>Hourly forecast</h1>

        <button className="bg-neutral-300 px-4 py-2 flex rounded-md justify-between items-center gap-2 text-white">
          <span>
            {isLoading
              ? "--"
              : new Date(daily.time[0]).toLocaleDateString("en-US", {
                  weekday: "long",
                })}
          </span>
          <img src={dropdownIcon} alt="dropdown-icon" />
        </button>
      </div>

      <ul className="flex flex-col justify-between sm:gap-4">
        {hoursToRender
          .map((time, index) => {
            // ✅ LOADING: STRINGS ONLY
            if (isLoading) {
              return (
                <li
                  key={index}
                  className="bg-blue-800 flex justify-between opacity-80 items-center px-4 py-2 rounded-md"
                >
                  <div className="flex gap-2 items-center">
                    <span className="w-12 text-center">--</span>
                    <h1>--</h1>
                  </div>
                  <span>--°</span>
                </li>
              );
            }

            // ✅ REAL DATA
            const date = new Date(time);
            const hour = date.getHours();
            const hour12 = hour % 12 || 12;
            const period = hour >= 12 ? "PM" : "AM";

            if (hour < 15 || hour > 22) return null;

            const condition = getWeatherCondition(
              hourly.temperature_2m[index],
              hourly.relativehumidity_2m[index],
              hourly.precipitation[index],
              hourly.cloudcover[index],
              hourly.windspeed_10m[index]
            );

            const weatherLogo = conditionToSvg[condition];

            return (
              <li
                key={index}
                className="bg-blue-800 flex justify-between opacity-90 items-center px-4 py-2 rounded-md"
              >
                <div className="flex gap-2 items-center">
                  <img src={weatherLogo} className="w-12" alt={condition} />
                  <h1>
                    {hour12} {period}
                  </h1>
                </div>
                <span>
                  {hourly.temperature_2m[index]}
                  {"\u00B0"}
                </span>
              </li>
            );
          })
          .filter(Boolean)
          .slice(0, 8)}
      </ul>
    </div>
  );
};

export default SideBar;
