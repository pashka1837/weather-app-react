import { TimeType } from "../../constants";

type TimeSelectorProps = {
  setTime: React.Dispatch<React.SetStateAction<TimeType>>;
  curTime: TimeType;
};

export function TimeSelector({ setTime, curTime }: TimeSelectorProps) {
  function handleSetTime(e: React.ChangeEvent<HTMLInputElement>) {
    setTime(e.target.value as TimeType);
  }

  return (
    <div className="flex flex-row justify-center gap-4 md:gap-8">
      <div className="flex gap-2">
        <input
          type="radio"
          id={TimeType.DAY}
          name={TimeType.DAY}
          value={TimeType.DAY}
          checked={curTime === TimeType.DAY}
          onChange={handleSetTime}
        />
        <label htmlFor={TimeType.DAY}>По дням</label>
      </div>
      <div className="flex gap-2">
        <input
          type="radio"
          id={TimeType.HOUR}
          name={TimeType.HOUR}
          value={TimeType.HOUR}
          checked={curTime === TimeType.HOUR}
          onChange={handleSetTime}
        />
        <label htmlFor={TimeType.HOUR}>По часам</label>
      </div>
    </div>
  );
}
