import axios from "axios"

export const isComplete = async () => {
    const res = await axios.get("http://localhost:3000/api/isUserComplete")
    if (res.status === 200) {
        return res.data.isProfileComplete
    }
}