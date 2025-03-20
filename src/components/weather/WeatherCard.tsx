"use client";
import { useState, useEffect } from "react";
import {
  fetchCoordinates,
  fetchCityFromCoordinates,
  fetchCurrentWeather,
  fetchWeatherForecast,
  groupByDay,
} from "@/lib/weather";

// Define default weather data to display initially
const defaultWeatherData = {
  displayCity: "Unknown Location",
  currentWeather: {
    main: {
      temp: 20,
      feels_like: 19,
      humidity: 60,
    },
    weather: [
      {
        description: "clear sky",
        icon: "01d",
      },
    ],
    wind: {
      speed: 3.5,
    },
    visibility: 10000,
    sys: {
      sunrise: Math.floor(new Date().setHours(6, 0, 0, 0) / 1000), // 6:00 AM today
      sunset: Math.floor(new Date().setHours(18, 0, 0, 0) / 1000), // 6:00 PM today
    },
  },
  forecast: [
    {
      dt: Math.floor(Date.now() / 1000),
      main: { temp: 21 },
      weather: [{ description: "clear sky", icon: "01d" }],
      sys: { pod: "d" },
    },
    {
      dt: Math.floor(Date.now() / 1000) + 86400, // +1 day
      main: { temp: 22 },
      weather: [{ description: "few clouds", icon: "02d" }],
      sys: { pod: "d" },
    },
    {
      dt: Math.floor(Date.now() / 1000) + 172800, // +2 days
      main: { temp: 20 },
      weather: [{ description: "scattered clouds", icon: "03d" }],
      sys: { pod: "d" },
    },
    {
      dt: Math.floor(Date.now() / 1000) + 259200, // +3 days
      main: { temp: 19 },
      weather: [{ description: "light rain", icon: "10d" }],
      sys: { pod: "d" },
    },
    {
      dt: Math.floor(Date.now() / 1000) + 345600, // +4 days
      main: { temp: 23 },
      weather: [{ description: "clear sky", icon: "01d" }],
      sys: { pod: "d" },
    },
  ],
};

const WeatherCard = () => {
  const [city, setCity] = useState("");
  const [displayCity, setDisplayCity] = useState(
    defaultWeatherData.displayCity
  ); // City to display
  const [currentWeather, setCurrentWeather] = useState<any>(
    defaultWeatherData.currentWeather
  );
  const [forecast, setForecast] = useState<ReturnType<typeof groupByDay>>(
    defaultWeatherData.forecast
  );
  const [error, setError] = useState<string | null>(null);

  // Fetch weather data using lat/lon
  const fetchWeatherData = async (lat: number, lon: number) => {
    try {
      // Fetch city name from coordinates
      const cityData = await fetchCityFromCoordinates(lat, lon);
      setDisplayCity(cityData.name);

      // Fetch current weather
      const current = await fetchCurrentWeather(lat, lon);
      setCurrentWeather(current);

      // Fetch 5-day forecast
      const forecastData = await fetchWeatherForecast(lat, lon);
      const dailyForecast = groupByDay(forecastData.list);
      setForecast(dailyForecast);

      setError(null);
    } catch (err) {
      setError((err as Error).message);
      setCurrentWeather(defaultWeatherData.currentWeather);
      setForecast(defaultWeatherData.forecast);
      setDisplayCity(defaultWeatherData.displayCity);
    }
  };

  // Get user's location on mount
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          console.log(position);
          fetchWeatherData(latitude, longitude);
        },
        (err) => {
          setError(
            "Location permission denied. Please search for a city manually."
          );
          setCity(""); // No automatic fallback to Chicago
        }
      );
    } else {
      setError(
        "Geolocation is not supported by your browser. Please search for a city manually."
      );
      setCity("");
    }
  }, []);

  // Handle manual city search
  const handleCitySearch = async () => {
    if (!city) {
      setError("Please enter a city name.");
      return;
    }
    try {
      const { lat, lon } = await fetchCoordinates(city);
      await fetchWeatherData(lat, lon);
    } catch (err) {
      setError((err as Error).message);
      setCurrentWeather(defaultWeatherData.currentWeather);
      setForecast(defaultWeatherData.forecast);
      setDisplayCity(defaultWeatherData.displayCity);
    }
  };

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      {/* Search Bar */}
      <div className="flex mb-6">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="flex-1 p-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Enter city name"
        />
        <button
          onClick={handleCitySearch}
          className="p-2 bg-green-500 text-white rounded-r-md hover:bg-green-600"
        >
          Search
        </button>
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* Current Weather Section */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-bold text-gray-800">{displayCity}</h2>
          <p className="text-gray-500">
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
          <div className="flex items-center mt-2">
            <div className="p-2 bg-gray-200 rounded-full">
              <img
                src={`http://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@2x.png`}
                alt="Weather icon"
                className="w-16 h-16"
              />
            </div>
            <p className="text-4xl font-semibold ml-4">
              {currentWeather.main.temp}°C
            </p>
          </div>
          <p className="capitalize text-gray-600 mt-2">
            {currentWeather.weather[0].description}
            <br />
            Feels like {currentWeather.main.feels_like}°C
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-6 md:mt-0">
          <div className="text-center">
            <p className="text-gray-500">Wind Speed</p>
            <p className="text-lg font-semibold">
              {currentWeather.wind.speed} m/s
            </p>
          </div>
          <div className="text-center">
            <p className="text-gray-500">Humidity</p>
            <p className="text-lg font-semibold">
              {currentWeather.main.humidity}%
            </p>
          </div>
          <div className="text-center">
            <p className="text-gray-500">Visibility</p>
            <p className="text-lg font-semibold">
              {currentWeather.visibility / 1000} km
            </p>
          </div>
          <div className="text-center flex flex-col items-center">
            <p className="text-gray-500">Sunrise</p>
            <div className="flex items-center">
              <span className="text-yellow-500 mr-1">🌅</span>
              <p className="text-lg font-semibold">
                {new Date(currentWeather.sys.sunrise * 1000).toLocaleTimeString(
                  "en-US",
                  {
                    hour: "numeric",
                    minute: "numeric",
                    hour12: true,
                  }
                )}
              </p>
            </div>
          </div>
          <div className="text-center flex flex-col items-center">
            <p className="text-gray-500">Sunset</p>
            <div className="flex items-center">
              <span className="text-orange-500 mr-1">🌇</span>
              <p className="text-lg font-semibold">
                {new Date(currentWeather.sys.sunset * 1000).toLocaleTimeString(
                  "en-US",
                  {
                    hour: "numeric",
                    minute: "numeric",
                    hour12: true,
                  }
                )}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 5-Day Forecast Section */}
      <div>
        <h3 className="text-xl font-semibold text-gray-700 mb-4">
          5-Day Forecast
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {forecast.map((day) => (
            <div
              key={day.dt}
              className="p-4 bg-gray-100 rounded-md text-center"
            >
              <p className="font-medium text-gray-800">
                {new Date(day.dt * 1000).toLocaleDateString("en-US", {
                  weekday: "short",
                })}
              </p>
              <div className="p-2 bg-white rounded-full inline-block my-2">
                <img
                  src={`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                  alt="Weather icon"
                  className="w-12 h-12"
                />
              </div>
              <p className="text-lg font-semibold">{day.main.temp}°C</p>
              <p className="capitalize text-gray-600">
                {day.weather[0].description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
