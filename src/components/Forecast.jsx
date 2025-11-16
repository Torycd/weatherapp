import svgBackground from "../assets/images/bg-today-large.svg";
import sunny from "../assets/images/icon-sunny.webp";
import rain from "../assets/images/icon-rain.webp";
import drizzle from "../assets/images/icon-drizzle.webp";
import snow from "../assets/images/icon-snow.webp";
import fog from "../assets/images/icon-fog.webp";
import overcast from "../assets/images/icon-overcast.webp";
import partlyCloudy from "../assets/images/icon-partly-cloudy.webp";
import storm from "../assets/images/icon-storm.webp";
import dropdownIcon from "../assets/images/icon-dropdown.svg";

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
        <div className="grid grid-cols-4 gap-8 mt-4">
          <div className="col-span-1 rounded-md bg-blue-900 opacity-75 p-4">
            <h1 className="">Feels like</h1>
            <h1 className="text-3xl">{currentTemp}</h1>
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
      </div>
      <div className="col-span-2 bg-blue-900 flex flex-col justify-between rounded-lg p-3">
        <div className="flex justify-between">
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
        <ul className="flex flex-col">
          {hourly.time.map((time, index) => {
            const date = new Date(time);
            const hour = date.getHours();

            if (hour >= 15 && hour <= 22) {
              return (
                <li className="bg-neutral-300 px-4 py-2 rounded-md ">
                  <span>{hourly.temperature_2m[index]}</span>
                </li>
              );
            }
          })}
        </ul>
      </div>
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
