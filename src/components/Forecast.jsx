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

function getWeatherCondition(temp, humidity, precip, cloud, wind) {
  if (precip > 10 && wind > 40) return "storm";
  if (precip > 2 && temp > 2) return "rain";
  if (precip > 0.2 && precip <= 2 && temp > 2) return "drizzle";
  if (precip > 0.2 && temp <= 2) return "snow";
  if (humidity > 90 && cloud < 60 && precip === 0) return "fog";
  if (cloud > 85 && precip === 0) return "overcast";
  if (cloud >= 40 && cloud <= 85 && precip === 0) return "partly-cloudy";
  if (cloud < 40 && precip === 0) return "sunny";
  return "unknown";
}

function Forecast({ data }) {
  if (!data || !data.hourly || !data.daily) {
    return <p className="text-center mt-4">Loading forecast...</p>;
  }
  const { hourly, daily } = data;
  // console.log(hourly)
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
  if (!data) return <p className="text-center mt-4">No forecast available</p>;

  // console.log(hourly);
  // console.log(daily);
  console.log(data);
  return (
    <div className="grid grid-cols-7 mt-8 gap-5">
      <div className="col-span-5 flex flex-col">
        <FirstLook
          svgBackground={svgBackground}
          data={data}
          daily={daily}
          weatherLogo={weatherLogo}
          hourly={hourly}
        />
        <Parameter
          currentPrecip={currentPrecip}
          currentWind={currentWind}
          currentTemp={currentTemp}
          currentHumidity={currentHumidity}
        />
        <Daily daily={daily} weatherLogo={weatherLogo} />
      </div>
      <SideBar daily={daily} hourly={hourly} />
    </div>
  );
}

export default Forecast;
//  const hour = new Date(time).getHours()

{
  /* <ul className="flex flex-col justify-between space-y-1">
          {hourly.time
            .map((time, index) => ({
              time,
              temp: hourly.temperature_2m[index],
              index,
            }))
            .filter((item) => {
              const date = new Date(item.time);
              const hour = date.getHours();
              const today = new Date().toISOString().split("T")[0]; // Today's actual date
              const itemDate = date.toISOString().split("T")[0];

              return itemDate === today && hour >= 15 && hour <= 22;
            })
            .map((item) => (
              <li
                key={item.index}
                className="bg-neutral-300 px-4 py-2 rounded-md"
              >
                {item.time} - {item.temp}°C
              </li>
            ))}
        </ul> */
}
