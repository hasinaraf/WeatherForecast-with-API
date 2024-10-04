import React, { useState, useEffect } from "react";
import axios from "axios";

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState("Kuala Lumpur");
  const [loading, setLoading] = useState(true);

  const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
        );
        setWeatherData(response.data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchWeather();
  }, [city, API_KEY]);

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-100">
      <h1 className="text-4xl font-bold mb-4">Weather Forecast</h1>
      <input
        type="text"
        value={city}
        onChange={handleCityChange}
        placeholder="Enter city name"
        className="p-2 border border-gray-300 rounded-lg mb-4"
      />
      {loading ? (
        <p>Loading...</p>
      ) : weatherData ? (
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold">{weatherData.name}</h2>
          <p className="text-lg">{weatherData.weather[0].description}</p>
          <p className="text-lg">Temperature: {weatherData.main.temp} °C</p>
          <p className="text-lg">Humidity: {weatherData.main.humidity} %</p>
          <p className="text-lg">Wind Speed: {weatherData.wind.speed} m/s</p>
        </div>
      ) : (
        <p>Could not fetch weather data</p>
      )}
    </div>
  );
};

export default Weather;
