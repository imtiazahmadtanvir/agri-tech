import { WeatherData } from '@/types/type';
import axios from 'axios';

// Interface for Geocoding Response
interface GeocodingResponse {
    lat: number;
    lon: number;
    name: string;
    country: string;
}

// Interface for Reverse Geocoding Response
interface ReverseGeocodingResponse {
    name: string;
    country: string;
}


// Interface for Forecast
interface ForecastItem {
    dt: number;
    main: { temp: number };
    weather: { description: string; icon: string }[];
}

interface WeatherForecast {
    list: ForecastItem[];
    city: { name: string };
}

// Fetch Coordinates for a City (for manual search)
export const fetchCoordinates = async (city: string): Promise<GeocodingResponse> => {
    const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
    const url = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`;

    try {
        const response = await axios.get(url);
        if (response.data.length === 0) {
            throw new Error('City not found');
        }
        return response.data[0];
    } catch (error) {
        throw new Error('Failed to fetch coordinates');
    }
};

//  Get city name from lat/lon
export const fetchCityFromCoordinates = async (lat: number, lon: number): Promise<ReverseGeocodingResponse> => {
    const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
    const url = `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${apiKey}`;

    try {
        const response = await axios.get(url);
        if (response.data.length === 0) {
            throw new Error('Location not found');
        }
        return response.data[0];
    } catch (error) {
        throw new Error('Failed to fetch city name');
    }
};

// Fetch Current Weather using Lat/Lon
export const fetchCurrentWeather = async (lat: number, lon: number): Promise<WeatherData> => {
    const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch current weather');
    }
};
export const fetchUVIndex = async (lat: number, lon: number): Promise<number> => {
    const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
    const url = `http://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=${apiKey}`;

    try {
        const response = await axios.get(url);
        return response.data.value; // UV Index value
    } catch (error) {
        throw new Error('Failed to fetch UV Index');
    }
};

// Fetch 5-Day Forecast using Lat/Lon
export const fetchWeatherForecast = async (lat: number, lon: number): Promise<WeatherForecast> => {
    const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch weather forecast');
    }
};

// Group forecast by day (use noon forecast for each day)
export const groupByDay = (forecastList: ForecastItem[]): ForecastItem[] => {
    const dailyData: { [key: string]: ForecastItem } = {};

    forecastList.forEach((item) => {
        const date = new Date(item.dt * 1000).toLocaleDateString();
        const hour = new Date(item.dt * 1000).getHours();
        if (!dailyData[date] || hour === 12) {
            dailyData[date] = item;
        }
    });

    return Object.values(dailyData).slice(0, 5); // 5 days
};