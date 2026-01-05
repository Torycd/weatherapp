import svgBackground from "../assets/images/bg-today-large.svg";

import sunny from "../assets/images/icon-sunny.webp";
import rain from "../assets/images/icon-rain.webp";
import drizzle from "../assets/images/icon-drizzle.webp";
import snow from "../assets/images/icon-snow.webp";
import fog from "../assets/images/icon-fog.webp";
import overcast from "../assets/images/icon-overcast.webp";
import partlyCloudy from "../assets/images/icon-partly-cloudy.webp";
import storm from "../assets/images/icon-storm.webp";

import Parameter from "./Parameter";
import FirstLook from "./FirstLook";
import SideBar from "./SideBar";
import Daily from "./Daily";

import { getWeatherCondition } from "../utils/weatherCondition";
import useGeo from "../hooks/useGeo.js";

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

function Forecast({ data }) {
  const { status: apiResponse } = useGeo();

  const isLoading = !data || !data.hourly || !data.daily;

  const safeHourly = isLoading
    ? {
        temperature_2m: Array(24).fill(0),
        relativehumidity_2m: Array(24).fill(0),
        precipitation: Array(24).fill(0),
        cloudcover: Array(24).fill(0),
        windspeed_10m: Array(24).fill(0),
      }
    : data.hourly;

  const safeDaily = isLoading
    ? {
        time: [],
        temperature_2m_max: [],
        temperature_2m_min: [],
      }
    : data.daily;

  const currentHourIndex = new Date().getHours();

  const currentTemp = safeHourly.temperature_2m[currentHourIndex];
  const currentHumidity = safeHourly.relativehumidity_2m[currentHourIndex];
  const currentPrecip = safeHourly.precipitation[currentHourIndex];
  const currentCloud = safeHourly.cloudcover[currentHourIndex];
  const currentWind = safeHourly.windspeed_10m[currentHourIndex];

  const condition = isLoading
    ? "sunny"
    : getWeatherCondition(
        currentTemp,
        currentHumidity,
        currentPrecip,
        currentCloud,
        currentWind
      );

  const weatherLogo = conditionToSvg[condition];

  return (
    <div className="grid grid-cols-7 gap-5 mt-8">
      {/* MAIN PANEL */}
      <div className="col-span-5 flex flex-col rounded-lg">
        <FirstLook
          stateApi={apiResponse}
          svgBackground={svgBackground}
          data={data}
          daily={safeDaily}
          hourly={safeHourly}
          weatherLogo={weatherLogo}
          isLoading={isLoading}
        />

        <Parameter
          stateApi={apiResponse}
          currentTemp={currentTemp}
          currentHumidity={currentHumidity}
          currentPrecip={currentPrecip}
          currentWind={currentWind}
          isLoading={isLoading}
        />

        <Daily
          stateApi={apiResponse}
          daily={safeDaily}
          conditionToSvg={conditionToSvg}
          isLoading={isLoading}
        />
      </div>

      {/* SIDEBAR */}
      <SideBar
        stateApi={apiResponse}
        daily={safeDaily}
        hourly={safeHourly}
        isLoading={isLoading}
      />
    </div>
  );
}

export default Forecast;
