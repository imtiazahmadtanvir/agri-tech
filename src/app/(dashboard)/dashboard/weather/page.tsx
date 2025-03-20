"use client";
import {
  fetchCityFromCoordinates,
  fetchCurrentWeather,
  fetchUVIndex,
  fetchWeatherForecast,
  groupByDay,
} from "@/lib/weather";

import { defaultWeatherData } from "@/utils/weatherData";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaWind } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { MdWaterDrop } from "react-icons/md";

export default function WeatherPage() {
  const [city, setCity] = useState(defaultWeatherData.displayCity);
  const [weather, setWeather] = useState(defaultWeatherData.currentWeather);
  const [forecast, setForecast] = useState<ReturnType<typeof groupByDay>>(
    defaultWeatherData.forecast
  );
  const [uvIndex, setUvIndex] = useState<number | null>(null);
  const [formattedDate, setFormattedDate] = useState("");
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
      const uv = await fetchUVIndex(lat, lon);
      setUvIndex(uv);
      console.log(uv);
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
          setCity("");
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
      setCity("");
    }
  }, []);

  useEffect(() => {
    setFormattedDate(
      new Date().toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    );
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 sm:p-6 ">
      {/* 1st Grid: Status and Other Countries */}
      <div>
        {/* Status */}
        <div className="w-full bg-white p-4 sm:p-6 rounded-2xl  flex flex-col sm:flex-row justify-between items-center">
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
              {formattedDate}
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
            <div className="bg-white p-4 rounded-2xl ">
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
        <div className="bg-white p-4 sm:p-6 rounded-xl  mb-4 sm:mb-6">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-700 mb-4">
            Today&apos;s Highlight
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div className="text-center  bg-[#F8FAFC] p-4 rounded-xl">
              <div className="flex items-center justify-center gap-2">
                <FaWind />
                <p className="text-gray-500 text-sm sm:text-base">
                  Wind Status
                </p>
              </div>
              <h1 className="text-base sm:text-lg font-semibold">
                {weather.wind.speed} m/s
              </h1>
              <p className="text-gray-500 text-xs sm:text-sm mt-1">
                {" "}
                {new Date(weather.dt * 1000).toLocaleTimeString("en-US", {
                  hour: "numeric",
                  minute: "numeric",
                  hour12: true,
                })}
              </p>
            </div>
            <div className="text-center bg-[#F8FAFC] p-4 rounded-xl">
              <div className="flex items-center justify-center gap-2">
                <MdWaterDrop />
                <p className="text-gray-500 text-sm sm:text-base">Humidity</p>
              </div>
              <h1 className="text-base sm:text-lg font-semibold">
                {weather.main.humidity}%
              </h1>
            </div>
            <div className=" bg-[#F8FAFC] p-4 rounded-xl items-center justify-center gap-5 flex">
              <Image
                height={50}
                width={50}
                src={"/icons/sunrise-morning-svgrepo-com.svg"}
                alt="icon"
              />
              <div className=" ">
                <p className="">Sunrise</p>
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
            <div className="text-center bg-[#F8FAFC] p-4 rounded-xl">
              <p className="text-gray-500 text-sm sm:text-base">Visibility</p>
              <h1 className="text-base sm:text-lg font-semibold">
                {weather.visibility / 1000} km
              </h1>
              <p className="text-gray-500 text-xs sm:text-sm mt-1">
                {new Date(weather.dt * 1000).toLocaleTimeString("en-US", {
                  hour: "numeric",
                  minute: "numeric",
                  hour12: true,
                })}
              </p>
            </div>
            <div className="text-center bg-[#F8FAFC] p-4 rounded-xl">
              <p className="text-gray-500 text-sm sm:text-base">UV Index</p>
              <h1 className="text-base sm:text-lg font-semibold">
                {uvIndex !== null ? uvIndex : 0}
              </h1>
              <p className="text-xs sm:text-sm mt-1 text-gray-500">
                {uvIndex !== null
                  ? uvIndex >= 11
                    ? "Extreme ⚠️"
                    : uvIndex >= 8
                    ? "Very High 🔥"
                    : uvIndex >= 6
                    ? "High ☀️"
                    : uvIndex >= 3
                    ? "Moderate 🌤"
                    : "Low 🌥"
                  : ""}
              </p>
            </div>

            <div className=" bg-[#F8FAFC] p-4 rounded-xl flex items-center justify-center gap-3 ">
              <Image
                height={50}
                width={50}
                src={"/icons/sunset-svgrepo-com.svg"}
                alt="icon"
              />
              <div className="space-x-3">
                <p className="text-gray-500 text-sm sm:text-base">Sunset</p>
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
        <div className="bg-white p-4 sm:p-6 rounded-2xl ">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-700 mb-4">
            5-Day Forecast
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {forecast.map((day) => (
              <div
                key={day.dt}
                className="p-3 sm:p-4 bg-[#F8FAFC] rounded-2xl  text-center"
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
