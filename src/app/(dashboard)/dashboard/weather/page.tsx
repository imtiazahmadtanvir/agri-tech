"use client";
import {
  fetchCityFromCoordinates,
  fetchCurrentWeather,
  fetchWeatherForecast,
  groupByDay,
} from "@/lib/weather";
import { defaultWeatherData } from "@/utils/weatherData";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaLocationDot } from "react-icons/fa6";

export default function WeatherPage() {
  const [city, setCity] = useState(defaultWeatherData.displayCity);
  const [weather, setWeather] = useState(defaultWeatherData.currentWeather);
  const [forecast, setForecast] = useState<ReturnType<typeof groupByDay>>(
    defaultWeatherData.forecast
  );

  const fetchWeatherData = async (lat: number, lon: number) => {
    try {
      // Fetch city name from coordinates
      const cityData = await fetchCityFromCoordinates(lat, lon);
      setCity(cityData.name);

      // Fetch current weather
      const current = await fetchCurrentWeather(lat, lon);
      setWeather(current);

      // Fetch 5-day forecast
      const forecastData = await fetchWeatherForecast(lat, lon);
      const dailyForecast = groupByDay(forecastData.list);
      setForecast(dailyForecast);
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setCity(defaultWeatherData.displayCity);
      setWeather(defaultWeatherData.currentWeather);
      setForecast(defaultWeatherData.forecast);
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeatherData(latitude, longitude);
        },
        (error) => {
          console.error("Error getting location:", error.message);
          setCity(""); // Prompt manual search (you can add a search input later)
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
      setCity("");
    }
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 sm:p-6 max-w-7xl mx-auto">
      {/* 1st Grid: Status and Other Countries */}
      <div>
        {/* Status */}
        <div className="w-full bg-white p-4 sm:p-6 rounded-2xl shadow-md flex flex-col sm:flex-row justify-between items-center">
          <div className="w-full sm:w-auto">
            <h2 className="bg-[#11A146] w-fit text-white px-2 py-1 rounded-2xl flex items-center text-xs sm:text-sm">
              <span className="mr-1">
                <FaLocationDot />
              </span>
              {city || "Unknown Location"}
            </h2>
            <h2 className="text-2xl sm:text-4xl font-bold mt-2">
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
              })}
            </h2>
            <p className="text-gray-500 text-sm sm:text-base">
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
            <p className="text-gray-500 text-xs sm:text-sm mt-1">
              Last updated:{" "}
              {new Date(weather.dt * 1000).toLocaleTimeString("en-US", {
                hour: "numeric",
                minute: "numeric",
                hour12: true,
              })}
            </p>
          </div>
          <div className="flex items-center mt-4 sm:mt-0">
            <Image
              src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              height={80}
              width={80}
              alt="Weather icon"
              className="sm:h-[100px] sm:w-[100px]"
            />
            <div className="ml-0 sm:ml-4 text-center sm:text-left">
              <p className="text-2xl sm:text-4xl font-semibold">
                {weather.main.temp}°C
              </p>
              <p className="capitalize text-gray-600 mt-2 text-sm sm:text-base">
                {weather.weather[0].description}
                <br />
                Feels like {weather.main.feels_like}°C
              </p>
            </div>
          </div>
        </div>

        {/* Other Countries (Placeholder) */}
        <div className="mt-4 sm:mt-6">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-700 mb-4">
            Other Countries
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-2xl shadow-md">
              <p className="text-gray-500 text-sm">August</p>
              <h3 className="text-base sm:text-lg font-semibold">Coral</h3>
              <p className="text-xs sm:text-sm text-gray-600">Placeholder</p>
            </div>
            {/* Add more placeholder cards as needed */}
          </div>
        </div>
      </div>

      {/* 2nd Grid: Today's Highlight and Forecast */}
      <div className="w-full">
        {/* Today's Highlight */}
        <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-md mb-4 sm:mb-6">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-700 mb-4">
            Today's Highlight
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-gray-500 text-sm sm:text-base">Wind Status</p>
              <h1 className="text-base sm:text-lg font-semibold">
                {weather.wind.speed} m/s
              </h1>
            </div>
            <div className="text-center">
              <p className="text-gray-500 text-sm sm:text-base">Humidity</p>
              <h1 className="text-base sm:text-lg font-semibold">
                {weather.main.humidity}%
              </h1>
            </div>
            <div className="text-center">
              <p className="text-gray-500 text-sm sm:text-base">Visibility</p>
              <h1 className="text-base sm:text-lg font-semibold">
                {weather.visibility / 1000} km
              </h1>
            </div>
            <div className="text-center flex flex-col items-center">
              <p className="text-gray-500 text-sm sm:text-base">Sunrise</p>
              <div className="flex items-center">
                <span className="text-yellow-500 mr-1 text-sm sm:text-base">
                  🌅
                </span>
                <h1 className="text-base sm:text-lg font-semibold">
                  {new Date(weather.sys.sunrise * 1000).toLocaleTimeString(
                    "en-US",
                    {
                      hour: "numeric",
                      minute: "numeric",
                      hour12: true,
                    }
                  )}
                </h1>
              </div>
            </div>
            <div className="text-center flex flex-col items-center">
              <p className="text-gray-500 text-sm sm:text-base">Sunset</p>
              <div className="flex items-center">
                <span className="text-orange-500 mr-1 text-sm sm:text-base">
                  🌇
                </span>
                <h1 className="text-base sm:text-lg font-semibold">
                  {new Date(weather.sys.sunset * 1000).toLocaleTimeString(
                    "en-US",
                    {
                      hour: "numeric",
                      minute: "numeric",
                      hour12: true,
                    }
                  )}
                </h1>
              </div>
            </div>
          </div>
        </div>

        {/* Forecast */}
        <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-md">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-700 mb-4">
            5-Day Forecast
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {forecast.map((day) => (
              <div
                key={day.dt}
                className="p-3 sm:p-4 bg-white rounded-2xl shadow-md text-center"
              >
                <p className="font-medium text-gray-800 text-sm sm:text-base">
                  {new Date(day.dt * 1000).toLocaleDateString("en-US", {
                    weekday: "short",
                  })}
                </p>
                <div className="p-2 bg-gray-200 rounded-full inline-block my-2">
                  <Image
                    src={`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                    alt="Weather icon"
                    width={48}
                    height={48}
                    className="w-10 h-10 sm:w-12 sm:h-12"
                  />
                </div>
                <p className="text-base sm:text-lg font-semibold">
                  {day.main.temp}°C
                </p>
                <p className="capitalize text-gray-600 text-xs sm:text-sm">
                  {day.weather[0].description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
