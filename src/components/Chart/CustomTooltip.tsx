import { TooltipProps } from "recharts";
import { TimeType } from "../../constants";
import {
  NameType,
  ValueType,
} from "recharts/types/component/DefaultTooltipContent";

type CustomTooltipProps = {
  time: TimeType;
  data: HourlyWeatherDataType[];
} & TooltipProps<ValueType, NameType>;

export function CustomTooltip({
  active,
  payload,
  label,
  time,
  data,
}: CustomTooltipProps) {
  if (!active || !payload || !payload.length) return null;
  let curTimeData: HourlyWeatherDataType | undefined;
  if (time === "HOUR") {
    const [curTime, curDate] = label.split(" ") as [string, string];
    curTimeData = data.find((x) => x.day === curDate && x.time === curTime);
  } else {
    curTimeData = data.find((x) => x.day === label);
  }
  if (!curTimeData) return null;
  return (
    <div className="bg-zinc-50 p-2 rounded-xl">
      <p className="">{`Дата : ${label}`}</p>
      <p className="text-amber-500">{`Температура: ${curTimeData.temp}  \u2103`}</p>
      <p className="text-indigo-500">{`Давление: ${curTimeData.pressure} \u3371`}</p>
      <p className="text-teal-500">{`Ветер: ${curTimeData.wind} м/с`}</p>
      <p className="text-blue-500">{`Дождь: ${curTimeData.rain} мм`}</p>
      <p className="text-rose-500">{`Снег: ${curTimeData.snow} мм`}</p>
    </div>
  );
}
