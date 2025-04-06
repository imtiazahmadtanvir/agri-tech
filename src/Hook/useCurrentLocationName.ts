import { useQuery } from "@tanstack/react-query";

const fetchLocationName = async () => {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            reject("Geolocation is not supported");
        }

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;

                const res = await fetch(
                    `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
                );

                if (!res.ok) {
                    throw new Error("Failed to fetch location");
                }

                const data = await res.json();
                resolve(data.address);
            },
            (error) => {
                reject(error.message);
            }
        );
    });
};

const useCurrentLocationName = () => {
    return useQuery({
        queryKey: ["currentLocationName"],
        queryFn: fetchLocationName,
        retry: false,
        refetchOnWindowFocus: false,
        enabled: typeof window !== "undefined",
    });
};

export default useCurrentLocationName;
