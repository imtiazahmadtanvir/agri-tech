export type WeatherData = {
    coord: {
        lon: number;
        lat: number;
    };
    weather: {
        id: number;
        main: string;
        description: string;
        icon: string;
    }[];
    base: string;
    main: {
        temp: number;
        feels_like: number;
        temp_min?: number;
        temp_max?: number;
        pressure: number;
        humidity: number;
        sea_level?: number;
        grnd_level?: number;
    };
    visibility: number;
    wind: {
        speed: number;
        deg: number;
        gust?: number;
    };
    clouds: {
        all: number;
    };
    dt: number;
    sys: {
        country: string;
        sunrise: number;
        sunset: number;
    };
    timezone: number;
    id: number;
    name: string;
    cod: number;
    uvi?: number;
    forecast?: {
        dt: number;
        main: { temp: number };
        weather: { description: string; icon: string }[];
        sys: { pod: string };
    }[];
};
export interface MarketplaceItem {
    id: string;
    name: string;
    image: string;
    description: string;
    price: string;
    category: "seeds" | "equipment";
    condition?: "new" | "used";
    seller: {
        name: string;
        contact: string;
        location: string;
    };
    stock: number;
}
export interface MarketplaceItemForBuy {
    availabilityDate: string;
    category: string;
    description: string;
    email: string;
    isOrganic: boolean;
    location: string;
    price: string;
    productName: string;
    productPhoto: string;
    quantity: string;
    unit: string;
    username: string;
    listed: string;
}
