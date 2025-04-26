import { useQuery } from "@tanstack/react-query"
import axios from "axios"
const fetchCart = async () => {
    const { data } = await axios.get('/api/cart');
    return data
}
export const useCart = () => {
    return useQuery({
        queryKey: ['cart'],
        queryFn: fetchCart,
        staleTime: 1000 * 60 * 5
    })
}