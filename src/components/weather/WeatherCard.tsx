"use client";
import { useEffect, useState } from "react";
import { fetchCurrentWeather, fetchCityFromCoordinates } from "@/lib/weather";
import { defaultWeatherData } from "@/utils/weatherData";
import Image from "next/image";
import { FaLocationDot } from "react-icons/fa6";
import { MdWaterDrop } from "react-icons/md";
import { FaWind } from "react-icons/fa";

export function WeatherCard() {
  const [city, setCity] = useState(defaultWeatherData.displayCity);
  const [weather, setWeather] = useState(defaultWeatherData.currentWeather);
  const [loading, setLoading] = useState(true);

  const fetchWeatherData = async (lat: number, lon: number) => {
    try {
      // First fetch city name
      const cityData = await fetchCityFromCoordinates(lat, lon);
      setCity(cityData.name);

      // Then fetch weather
      const current = await fetchCurrentWeather(lat, lon);
      setWeather(current);
      setLoading(false);
    } catch {
      setWeather(defaultWeatherData.currentWeather);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeatherData(latitude, longitude);
        },
        () => {
          setLoading(false);
        }
      );
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <div className="bg-white p-4 rounded-xl shadow-sm animate-pulse">
        <div className="h-6 w-3/4 bg-gray-200 rounded mb-2"></div>
        <div className="flex justify-between items-center">
          <div className="space-y-2">
            <div className="h-4 w-24 bg-gray-200 rounded"></div>
            <div className="h-4 w-32 bg-gray-200 rounded"></div>
          </div>
          <div className="h-12 w-12 bg-gray-200 rounded-full"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm">
      <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
        <FaLocationDot className="text-green-600" />
        <span>{city || "Current Location"}</span>
      </div>

      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-2xl font-bold">{weather.main.temp}°C</h3>
          <p className="text-sm capitalize text-gray-500">
            {weather.weather[0].description}
          </p>
        </div>
        <Image
          src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
          width={64}
          height={64}
          alt="Weather icon"
        />
      </div>

      <div className="grid grid-cols-3 gap-2 mt-3 text-xs">
        <div className="flex items-center gap-1">
          <FaWind className="text-blue-500" />
          <span>{weather.wind.speed} m/s</span>
        </div>
        <div className="flex items-center gap-1">
          <MdWaterDrop className="text-blue-400" />
          <span>{weather.main.humidity}%</span>
        </div>
        <div className="text-right">Feels like {weather.main.feels_like}°C</div>
      </div>
    </div>
  );
}
