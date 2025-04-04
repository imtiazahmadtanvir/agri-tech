"use client"
import { useState, useEffect } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";


const useIsComplete = () => {
    const { data: session } = useSession()
    console.log(session?.user.email);
    const [isComplete, setIsComplete] = useState<boolean | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProfileStatus = async () => {
            try {
                setLoading(true);
                const { data } = await axios.get(`/api/isUserComplete`, {
                    params: { email: session?.user.email },
                });
                setIsComplete(data.isProfileComplete);
            } catch {
                setError("Failed to fetch profile status.");
            } finally {
                setLoading(false);
            }
        };

        if (session?.user.email) {
            fetchProfileStatus();
        }
    }, [session?.user.email]);

    return { isComplete, loading, error };
};

export default useIsComplete;
