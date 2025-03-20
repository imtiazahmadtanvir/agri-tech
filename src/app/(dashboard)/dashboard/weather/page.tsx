"use client";
import { fetchCityFromCoordinates, fetchCurrentWeather } from "@/lib/weather";
import { defaultWeatherData } from "@/utils/weatherData";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaLocationDot } from "react-icons/fa6";

export default function WeatherPage() {
  const [city, setCity] = useState(defaultWeatherData.displayCity);
  const [weather, setWeather] = useState(defaultWeatherData.currentWeather);
  const fetchWeatherData = async (lat: number, lon: number) => {
    try {
      // Fetch city name from coordinates
      //   const cityData = await fetchCityFromCoordinates(lat, lon);

      // Fetch current weather
      const current = await fetchCurrentWeather(lat, lon);
      console.log(current, "current");
      setCity(current.name);
      setWeather(current);
      // Fetch current weather
    } catch (error) {}
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
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }, []);
  return (
    <div className="grid grid-cols-2">
      {/* 1st grid */}
      <div>
        {/* status */}
        <div className="w-full bg-white p-4 rounded-2xl flex justify-between">
          <div>
            <h2 className="bg-[#11A146] w-fit text-white px-1 rounded-2xl flex items-center">
              <span>
                <FaLocationDot />
              </span>
              {city}
            </h2>
            <h2 className="text-4xl font-bold">
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
          </div>
          {/* icon */}
          <Image
            src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            height={100}
            width={100}
            alt="Weather icon"
          />
          <div>
            <p className="text-4xl font-semibold ml-4">{weather.main.temp}°C</p>
          </div>
        </div>
        {/* other country */}
        <div>
          <h3>Other Countries</h3>
          <div>
            <div>
              <p>Agaust</p>
              <h3>Coral</h3>
            </div>
          </div>
        </div>
      </div>
      {/* 2nd grid */}
      <div className="w-full">
        {/* today highlight */}
        <div>
          <h2>Today&apos;s Highlight</h2>
          <div className="grid-cols-3">
            <div>
              <p>Wind Status</p>
              <h1>7.90</h1>
              <p>9.00am</p>
            </div>
          </div>
        </div>
        {/* forecast */}
        <div></div>
      </div>
    </div>
  );
}
