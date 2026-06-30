import { useQuery } from "@tanstack/react-query";

interface Address {
    city?: string;
    town?: string;
    village?: string;
    state?: string;
    country?: string;
}

const fetchLocationName = async (): Promise<Address> => {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            reject("Geolocation is not supported");
            return;
        }

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;

                const res = await fetch(
                    `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
                );

                if (!res.ok) {
                    reject("Failed to fetch location");
                    return;
                }

                const data = await res.json();
                resolve(data.address as Address);
            },
            (error) => {
                reject(error.message);
            }
        );
    });
};

const useCurrentLocationName = () => {
    return useQuery<Address>({
        queryKey: ["currentLocationName"],
        queryFn: fetchLocationName,
        retry: false,
        refetchOnWindowFocus: false,
        enabled: typeof window !== "undefined",
    });
};

export default useCurrentLocationName;
