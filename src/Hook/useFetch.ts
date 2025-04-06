import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchData = async <T>(url: string): Promise<T> => {
    const response = await axios.get<T>(url);
    return response.data;
};

const useFetch = <T>(url: string) => {
    const {
        data,
        isLoading,
        isError,
        error,
    } = useQuery<T, Error>({
        queryKey: ["fetch", url],
        queryFn: () => fetchData<T>(url),
        enabled: !!url,
    });

    return {
        data,
        loading: isLoading,
        error: isError ? error?.message : null,
    };
};

export default useFetch;
