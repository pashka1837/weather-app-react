import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_URL;

const apiKey = import.meta.env.VITE_API_KEY;

export async function getCity(cityName: string) {
  try {
    const res = await axios.get(
      `${baseURL}/geo/1.0/direct?q=${cityName}&limit=2&appid=${apiKey}`
    );
    if (res.status !== 200) throw Error("Не получить данные с сервера");
    const { data } = res;
    if (!data.length) throw Error("Не удалось найти указанный город");
    return data.at(0) as GeoDataType;
  } catch (error: any) {
    throw Error(error?.message || "Что-то пошло не так, попробуйте еще раз");
  }
}

export async function getWeather(lat: number, lon: number) {
  try {
    const res = await axios.get(
      `${baseURL}/data/2.5/forecast?lat=${lat}&lon=${lon}&cnt=40&units=metric&appid=${apiKey}`
    );
    if (res.status !== 200) throw Error("Не получить данные с сервера");
    const { data } = res;
    if (!data.list.length)
      throw Error("Не удалось найти погодные данные по данной локации");
    return data as DailyDataType;
  } catch (error: any) {
    throw Error(error?.message || "Что-то пошло не так, попробуйте еще раз");
  }
}
