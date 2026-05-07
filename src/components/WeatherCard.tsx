import useWeatherFetch from "./useWeatherFetch";
import './WeatherCard.css'

export default function WeatherCard() {
  const { description, icon, temp } = useWeatherFetch();

  return (
    <div className="weather-container">
      <img src={`https://openweathermap.org/img/wn/${icon}.png`} alt="weather icon" />
      <div>{description} | {temp}</div>
    </div>
  );
}
