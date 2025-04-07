import useFetch from "./useFetch"

interface UserDetailsResponse {
    data: {
        email: string;
        firstName: string;
        lastName: string;
        phoneNumber: string;
        village: string;
        district: string;
        state: string;
        landSize: string;
        crops: string[];

    };
}

const useUserDetail = () => {

    const { data, error, loading } = useFetch<UserDetailsResponse>('/api/userDetails')
    return {
        userDetail: data?.data,
        loading,
        error: error,
    }
}
export default useUserDetail