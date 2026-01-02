import { getDailyCondition } from "../utils/weatherCondition";

const Daily = ({ daily, conditionToSvg }) => {
  return (
    <div className="mt-5">
      <h1 className="font-bold mb-3">Daily Forecast</h1>

      <ul className="flex justify-between gap-4">
        {daily.time.map((time, index) => {
          const condition = getDailyCondition(
            daily.temperature_2m_max[index],
            daily.precipitation_sum[index],
            daily.windspeed_10m_max[index]
          );

          const weatherLogo = conditionToSvg[condition];

          return (
            <li
              key={time}
              className="rounded-md bg-blue-900 opacity-75 p-4 flex flex-col justify-between"
            >
              <h1 className="text-center mb-2">
                {new Date(time).toLocaleDateString("en-US", {
                  weekday: "short",
                })}
              </h1>

              <img src={weatherLogo} alt={condition} className="w-24 mx-auto" />

              <div className="flex justify-between text-[10px] mt-2">
                <span>{daily.temperature_2m_max[index]}°</span>
                <span>{daily.temperature_2m_min[index]}°</span>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Daily;
