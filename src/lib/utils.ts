export function throwError(msg: string) {
  throw Error(msg);
}

export function parseWeatherData(
  data: DailyDataType,
  tmzShift: number
): HourlyWeatherDataType[] {
  const weatherData = data.list;
  return weatherData.map((d) => {
    const curDate = new Date((d.dt + tmzShift) * 1000);
    const day = curDate.toLocaleDateString("ru-Ru", {
      timeZone: "UTC",
      day: "numeric",
      month: "numeric",
    });
    const time = curDate.toLocaleTimeString("ru-Ru", {
      timeZone: "UTC",
      timeStyle: "short",
    });
    return {
      temp: d.main.temp,
      wind: d.wind.speed,
      pressure: d.main.pressure,
      rain: d.rain ? d.rain["3h"] : 0,
      snow: d.snow ? d.snow["3h"] : 0,
      day,
      time,
      date: "",
    };
  });
}
