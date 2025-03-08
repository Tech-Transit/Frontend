import React, { useState, useEffect } from "react";

const WeatherOverlay = ({ location }) => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    if (!location) return;

    // Mock API Call for Weather Data
    setTimeout(() => {
      setWeather({
        temp: "24°C",
        condition: "Sunny ☀️",
      });
    }, 1000);
  }, [location]);

  return (
    <div className="absolute top-4 right-4 p-4 bg-white shadow-md rounded">
      <h3 className="text-lg font-bold">Weather</h3>
      {weather ? (
        <p>{weather.temp} - {weather.condition}</p>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default WeatherOverlay;
