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
import {
  availableDayTimes,
  dataOptions,
  TimeType,
  UnitType,
} from "../../constants";

import { CustomTooltip } from "./CustomTooltip";
import { parseHoursToNum } from "../../lib/utils";

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
      const dayData = ar.find(
        (d) => !!availableDayTimes.find((t) => t === d.time)
      );
      if (dayData) return { ...dayData, date: dayData.day };
      const firstItemTime = parseHoursToNum(ar[0].time);
      const lastItemTime = parseHoursToNum(ar.at(-1)!.time);
      if (firstItemTime > 14)
        return {
          ...ar.at(0)!,
          date: ar.at(0)!.day,
        };
      if (lastItemTime < 12)
        return {
          ...ar.at(-1)!,
          date: ar.at(-1)!.day,
        };
      const medianTime = Math.floor((ar.length - 1) / 2);
      return { ...ar[medianTime], date: ar[medianTime].day };
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
