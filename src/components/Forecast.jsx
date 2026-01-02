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
  if (!data || !data.hourly || !data.daily) {
    return <p className="text-center mt-4">Loading forecast...</p>;
  }

  const { hourly, daily } = data;
  const currentHourIndex = new Date().getHours();

  const currentTemp = hourly.temperature_2m[currentHourIndex];
  const currentHumidity = hourly.relativehumidity_2m[currentHourIndex];
  const currentPrecip = hourly.precipitation[currentHourIndex];
  const currentCloud = hourly.cloudcover[currentHourIndex];
  const currentWind = hourly.windspeed_10m[currentHourIndex];

  const condition = getWeatherCondition(
    currentTemp,
    currentHumidity,
    currentPrecip,
    currentCloud,
    currentWind
  );

  const weatherLogo = conditionToSvg[condition];

  return (
    <div className="grid grid-cols-7 mt-8 gap-5">
      <div className="col-span-5 flex flex-col">
        <FirstLook
          svgBackground={svgBackground}
          data={data}
          daily={daily}
          hourly={hourly}
          weatherLogo={weatherLogo}
        />

        <Parameter
          currentTemp={currentTemp}
          currentHumidity={currentHumidity}
          currentPrecip={currentPrecip}
          currentWind={currentWind}
        />

        <Daily daily={daily} conditionToSvg={conditionToSvg} />
      </div>

      <SideBar daily={daily} hourly={hourly} />
    </div>
  );
}

export default Forecast;
