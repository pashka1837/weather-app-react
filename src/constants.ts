export enum UnitType {
  TEMP = "TEMP",
  WIND = "WIND",
  PRESS = "PRESS",
}

export enum TimeType {
  DAY = "DAY",
  HOUR = "HOUR",
}

export const dataOptions = {
  [UnitType.TEMP]: {
    sign: " \u2103",
    dataKey: "temp",
    name: "Температура",
    color: " #FFB200",
  },
  [UnitType.WIND]: {
    sign: " м/с",
    dataKey: "wind",
    name: "Ветер",
    color: "#3ab7bf",
  },
  [UnitType.PRESS]: {
    sign: " \u3371",
    dataKey: "pressure",
    name: "Давление",
    color: "#3f3cbb",
  },
};
