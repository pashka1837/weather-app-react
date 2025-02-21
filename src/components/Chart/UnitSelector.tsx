import { UnitType } from "../../constants";

type UnitSelectorProps = {
  setUnit: React.Dispatch<React.SetStateAction<UnitType>>;
  curUnit: UnitType;
};

export function UnitSelector({ setUnit, curUnit }: UnitSelectorProps) {
  function handleSetUnit(e: React.ChangeEvent<HTMLInputElement>) {
    setUnit(e.target.value as UnitType);
  }

  return (
    <div className="flex flex-row justify-center gap-4 md:gap-8">
      <div className="flex gap-2">
        <input
          type="radio"
          id={UnitType.TEMP}
          name={UnitType.TEMP}
          value={UnitType.TEMP}
          checked={curUnit === UnitType.TEMP}
          onChange={handleSetUnit}
        />
        <label htmlFor={UnitType.TEMP}>Температура</label>
      </div>
      <div className="flex gap-2">
        <input
          type="radio"
          id={UnitType.PRESS}
          name={UnitType.PRESS}
          value={UnitType.PRESS}
          checked={curUnit === UnitType.PRESS}
          onChange={handleSetUnit}
        />
        <label htmlFor={UnitType.PRESS}>Давление</label>
      </div>
      <div className="flex gap-2">
        <input
          type="radio"
          id={UnitType.WIND}
          name={UnitType.WIND}
          value={UnitType.WIND}
          checked={curUnit === UnitType.WIND}
          onChange={handleSetUnit}
        />
        <label htmlFor={UnitType.WIND}>Ветер</label>
      </div>
    </div>
  );
}
