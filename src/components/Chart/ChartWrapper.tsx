import { useState } from "react";
import { TimeSelector } from "./TimeSelector";
import { UnitSelector } from "./UnitSelector";
import { TimeType, UnitType } from "../../constants";
import { Chart } from "./Chart";

type ChartWrapperProps = {
  data: HourlyWeatherDataType[];
  cityName: string;
};

export default function ChartWrapper({ data, cityName }: ChartWrapperProps) {
  const [unit, setUnit] = useState<UnitType>(UnitType.TEMP);
  const [time, setTime] = useState<TimeType>(TimeType.DAY);
  return (
    <>
      <p className="text-xl text-slate-700 font-semibold self-center">
        {cityName}
      </p>
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 w-[100%] justify-center sm:justify-around">
        <UnitSelector curUnit={unit} setUnit={setUnit} />
        <TimeSelector curTime={time} setTime={setTime} />
      </div>
      <Chart data={data} time={time} unit={unit} />
    </>
  );
}
