import { lazy, Suspense, useActionState } from "react";
import { Search } from "./Search";
import { getCity, getWeather } from "../lib/api-calls";
import { parseWeatherData } from "../lib/utils";
import { Loader } from "../ui-lib/Loader";

const ChartWrapper = lazy(() => import("./Chart/ChartWrapper"));

async function handleSubmit(
  formState: SearchFormStateType | null,
  formData: FormData
): Promise<SearchFormStateType> {
  const search = formData.get("search");

  if (!search || typeof search !== "string")
    return {
      success: false,
      msg: "Неверный введенный город",
      data: null,
    };

  const cityName = search.toLowerCase();
  try {
    const cityData = await getCity(cityName);
    const dailyWeatherData = await getWeather(cityData.lat, cityData.lon);
    const weatherData = parseWeatherData(
      dailyWeatherData,
      dailyWeatherData.city.timezone
    );
    return {
      ...formState,
      success: true,
      msg: "",
      data: {
        weatherData,
        cityName: cityName.replace(/^./, (char) => char.toUpperCase()),
      },
    };
  } catch (error: any) {
    console.error(error);
    return {
      success: false,
      msg: error.message || "Произошла ошибка, попробуйте еще раз",
      data: null,
    };
  }
}

export function Home() {
  const [state, action, pending] = useActionState(handleSubmit, null);
  return (
    <div className="flex gap-5 md:gap-10 h-[100dvh] flex-col p-4  md:p-6">
      <Search action={action} pending={pending} />
      {pending && <Loader />}
      {state?.data && !pending && (
        <Suspense fallback={<Loader />}>
          <ChartWrapper
            cityName={state.data.cityName}
            data={state.data.weatherData}
          />
        </Suspense>
      )}
    </div>
  );
}
