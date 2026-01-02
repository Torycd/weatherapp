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

const SideBar = ({ daily, hourly }) => {
  return (
    <div className="col-span-2 bg-blue-900 flex flex-col justify-between rounded-lg p-3">
      <div className="flex justify-between mb-1">
        <h1>Hourly forecast</h1>
        <button className="bg-neutral-300 px-4 py-2 flex rounded-md justify-between items-center gap-2 text-white">
          <span>
            {new Date(daily.time[0]).toLocaleDateString("en-US", {
              weekday: "long",
            })}
          </span>
          <span>
            <img src={dropdownIcon} alt="dropdown-icon" />
          </span>
        </button>
      </div>
      <ul className="flex flex-col justify-between sm:gap-4">
        {hourly.time
          .map((time, index) => {
            const date = new Date(time);
            const hour = date.getHours();
            const hour12 = hour % 12 || 12;
            const period = hour >= 12 ? "PM" : "AM";

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

            const currentTemp = hourly.temperature_2m[index];
            const currentHumidity = hourly.relativehumidity_2m[index];
            const currentPrecip = hourly.precipitation[index];
            const currentCloud = hourly.cloudcover[index];
            const currentWind = hourly.windspeed_10m[index];

            const condition = getWeatherCondition(
              currentTemp,
              currentHumidity,
              currentPrecip,
              currentCloud,
              currentWind
            );

            const weatherLogo = conditionToSvg[condition];

            if (hour >= 15 && hour <= 22) {
              return (
                <li className="bg-blue-800 flex justify-between opacity-90 items-center px-4 py-2 rounded-md ">
                  <div className="flex gap-2 items-center">
                    <img src={weatherLogo} className="w-12" />
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
            }
          })
          .filter(Boolean)
          .slice(0, 8)}
      </ul>
    </div>
  );
};

export default SideBar;
