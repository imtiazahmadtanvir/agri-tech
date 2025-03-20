export const defaultWeatherData = {
    displayCity: "Unknown Location",
    currentWeather: {
        name: "Unknown Location",
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
        dt: Math.floor(Date.now() / 1000), // Current time as the default last updated time
    },
};