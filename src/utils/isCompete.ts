import axios from "axios";

export const isComplete = async (email: string | null | undefined) => {
    const { data } = await axios.get(`${process.env.NEXTAUTH_URL}/api/isUserComplete`, {
        params: {
            email: email,
        },
    });
    return data.isProfileComplete;
}