import React from "react";
import "./Header.css";
import WeatherCard from "./WeatherCard";

function Header() {
  console.log("Header update");

  return (
    <div className="header">
      <h3>오늘은 🗓️</h3>
      <div className="date-weather">
        <h1>{new Date().toDateString()}</h1>
        <WeatherCard />
      </div>
    </div>
  );
}

export default React.memo(Header);
