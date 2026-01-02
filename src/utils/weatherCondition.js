export function getWeatherCondition(temp, humidity, precip, cloud, wind) {
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

export function getDailyCondition(temp, precip, wind) {
  const assumedHumidity = 60;
  const assumedCloud = precip > 0 ? 80 : 30;

  return getWeatherCondition(temp, assumedHumidity, precip, assumedCloud, wind);
}
