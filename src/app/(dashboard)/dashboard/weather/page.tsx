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
  const [forecast, setForecast] = useState(defaultWeatherData.displayCity);

  const fetchWeatherData = async (lat: number, lon: number) => {
    try {
      // Fetch city name from coordinates
      const cityData = await fetchCityFromCoordinates(lat, lon);
      setCity(cityData.name);
      // Fetch current weather
      const current = await fetchCurrentWeather(lat, lon);
      setWeather(current);
      const forecast = await fetchWeatherForecast(lat, lon);
      const dailyForecast = groupByDay(forecast.list);
      setForecast(dailyForecast);
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setCity(defaultWeatherData.displayCity);
      setWeather(defaultWeatherData.currentWeather);
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
    <div className="grid grid-cols-2 gap-6 p-6">
      {/* 1st Grid: Status and Other Countries */}
      <div>
        {/* Status */}
        <div className="w-full bg-white p-4 rounded-2xl shadow-md flex justify-between items-center">
          <div>
            <h2 className="bg-[#11A146] w-fit text-white px-2 py-1 rounded-2xl flex items-center text-sm">
              <span className="mr-1">
                <FaLocationDot />
              </span>
              {city || "Unknown Location"}
            </h2>
            <h2 className="text-4xl font-bold mt-2">
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
              })}
            </h2>
            <p className="text-gray-500">
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
            <p className="text-gray-500 text-sm mt-1">
              Last updated:{" "}
              {new Date(weather.dt * 1000).toLocaleTimeString("en-US", {
                hour: "numeric",
                minute: "numeric",
                hour12: true,
              })}
            </p>
          </div>
          <div className="flex items-center">
            <Image
              src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              height={100}
              width={100}
              alt="Weather icon"
            />
            <div className="ml-4">
              <p className="text-4xl font-semibold">{weather.main.temp}°C</p>
              <p className="capitalize text-gray-600 mt-2">
                {weather.weather[0].description}
                <br />
                Feels like {weather.main.feels_like}°C
              </p>
            </div>
          </div>
        </div>

        {/* Other Countries (Placeholder) */}
        <div className="mt-6">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">
            Other Countries
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-2xl shadow-md">
              <p className="text-gray-500">August</p>
              <h3 className="text-lg font-semibold">Coral</h3>
              <p className="text-sm text-gray-600">Placeholder</p>
            </div>
            {/* Add more placeholder cards as needed */}
          </div>
        </div>
      </div>

      {/* 2nd Grid: Today's Highlight and Forecast */}
      <div className="w-full">
        {/* Today's Highlight */}
        <div className="bg-white p-4 rounded-2xl shadow-md mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Today&apos;s Highlight
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <p className="text-gray-500">Wind Status</p>
              <h1 className="text-lg font-semibold">
                {weather.wind.speed} m/s
              </h1>
            </div>
            <div className="text-center">
              <p className="text-gray-500">Humidity</p>
              <h1 className="text-lg font-semibold">
                {weather.main.humidity}%
              </h1>
            </div>
            <div className="text-center">
              <p className="text-gray-500">Visibility</p>
              <h1 className="text-lg font-semibold">
                {weather.visibility / 1000} km
              </h1>
            </div>
            <div className="text-center flex flex-col items-center">
              <p className="text-gray-500">Sunrise</p>
              <div className="flex items-center">
                <span className="text-yellow-500 mr-1">🌅</span>
                <h1 className="text-lg font-semibold">
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
              <p className="text-gray-500">Sunset</p>
              <div className="flex items-center">
                <span className="text-orange-500 mr-1">🌇</span>
                <h1 className="text-lg font-semibold">
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

        {/* Forecast (Placeholder) */}
        <div className="bg-white p-4 rounded-2xl shadow-md">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">
            5-Day Forecast
          </h3>
          <div className="grid grid-cols-5 gap-4">
            <div className="text-center">
              <p className="font-medium text-gray-800">Mon</p>
              <div className="p-2 bg-gray-200 rounded-full inline-block my-2">
                <img
                  src="http://openweathermap.org/img/wn/01d@2x.png"
                  alt="Weather icon"
                  className="w-12 h-12"
                />
              </div>
              <p className="text-lg font-semibold">20°C</p>
              <p className="capitalize text-gray-600">Clear Sky</p>
            </div>
            {/* Add more placeholder forecast cards as needed */}
          </div>
        </div>
      </div>
    </div>
  );
}
