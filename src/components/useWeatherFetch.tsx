import { useEffect, useState } from "react";
import type { WMeta } from "./WeatherType";

export default function useWeatherFetch() {
  const url = "https://api.openweathermap.org/data/2.5/weather?";
  const url2 = "https://api.openweathermap.org/data/2.5/forecast?";
  const city = "seoul";

  const [weather, setWeather] = useState<WMeta | null>(null);

  //   useEffect(() => {
  //     const fetchWeather = async () => {
  //       try {
  //         const response = await fetch(
  //           `${url}q=${city}&appid=${apiKey}&units=metric&lang=kr`,
  //         );
  //         if (!response.ok) {
  //           throw new Error(
  //             "Weather API Connection Error. Status: " + response.status,
  //           );
  //         }

  //         const meta: WMeta = await response.json();

  //         setWeather(meta);
  //         // setDescription(meta.weather[0].description);
  //         // setIcon(meta.weather[0].icon);
  //         // setTemp(meta.main.temp.toFixed(1));
  //       } catch (e) {
  //         throw new Error("Weather API Connection Error" + e);
  //       }
  //     };
  //     fetchWeather();
  //   }, []);
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        const apiKey = import.meta.env.VITE_OPEN_WEATHER_KEY;

        try {
          const response = await fetch(
            `${url}appid=${apiKey}&units=metric&lang=kr&lat=${lat}&lon=${lon}`,
          );

          if (!response.ok) {
            console.log("HTTP Error Status: " + response.status);
            return;
          }

          const meta = await response.json();
          setWeather(meta);
        } catch (e) {
          console.log("HTTP Error");
        }
      },
      (e) => {
        console.log("Location Error: " + e);
      },
    );
  }, []);

  const description = weather?.weather[0].description ?? "날씨를 가져올게요...";
  const icon = weather?.weather[0].icon ?? "";
  const temp = weather?.main.temp.toFixed(1) ?? 0;

  return { description, icon, temp };
}