import { useMemo } from "react";
import {
  Line,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { dataOptions, TimeType, UnitType } from "../../constants";

import { CustomTooltip } from "./CustomTooltip";

type ChartProps = {
  data: HourlyWeatherDataType[];
  unit: UnitType;
  time: TimeType;
};

type DataByDaysType = {
  [key: string]: HourlyWeatherDataType[];
};

export function Chart({ data, unit, time }: ChartProps) {
  const refactorData = useMemo(() => {
    if (time === "HOUR")
      return data.map((d) => ({ ...d, date: d.time + " " + d.day }));

    //if by day statistics needed, we will show temp at 12:00 | 13:00| 14:00
    // or median temp for a day
    const dataByDays: DataByDaysType = {};
    data.forEach((d) => {
      if (dataByDays[d.day]) dataByDays[d.day].push(d);
      else dataByDays[d.day] = [d];
    });

    return Object.values(dataByDays).map((ar) => {
      if (ar.length !== 8)
        return ar.reduce((med, cur, i) => {
          if (i === ar.length - 1)
            return {
              ...med,
              temp: Number((med.temp / ar.length).toFixed(2)),
              wind: Number((med.wind / ar.length).toFixed(2)),
              pressure: Number((med.pressure / ar.length).toFixed(2)),
              date: cur.day,
            };
          return {
            ...med,
            temp: med.temp + cur.temp,
            wind: med.wind + cur.wind,
            pressure: med.pressure + cur.pressure,
          };
        }, ar[0]);

      const s = ar.find(
        (d) => d.time === "12:00" || d.time === "13:00" || d.time === "14:00"
      );
      return s ? { ...s, date: s.day } : { ...ar[4], date: ar[4].day };
    });
  }, [time, data]);

  return (
    <ResponsiveContainer width={"100%"} height={"100%"}>
      <LineChart
        width={600}
        height={300}
        data={refactorData}
        margin={{ top: 5, right: 10, bottom: 5, left: 10 }}
      >
        <Line
          type="monotone"
          dataKey={dataOptions[unit].dataKey}
          stroke={dataOptions[unit].color}
          unit={dataOptions[unit].sign}
          name={dataOptions[unit].name}
          activeDot={true}
        />

        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <XAxis dataKey="date" name="Дата" />
        <YAxis
          dataKey={dataOptions[unit].dataKey}
          unit={dataOptions[unit].sign}
        />
        <Tooltip content={<CustomTooltip time={time} data={refactorData} />} />
      </LineChart>
    </ResponsiveContainer>
  );
}
