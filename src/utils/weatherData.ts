export const defaultWeatherData = {
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