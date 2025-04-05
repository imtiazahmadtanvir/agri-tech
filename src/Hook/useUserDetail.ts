import { useState } from "react"
import useFetch from "./useFetch"

const useUserDetail = () => {
    const [userDetail, setUserDetail] = useState(null)
    const { data, error, loading } = useFetch('/api/userDetails')
}
export default useUserDetail