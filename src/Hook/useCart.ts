import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { useSession } from "next-auth/react";
const fetchCart = async () => {
    const { data } = await axios.get('/api/cart');
    return data
}
export const useCart = () => {
    const { status } = useSession()
    const shouldFetchCart = status === "authenticated";
    return useQuery({
        queryKey: ['cart'],
        queryFn: fetchCart,
        staleTime: 1000 * 60 * 5,
        enabled: shouldFetchCart,
    })
}