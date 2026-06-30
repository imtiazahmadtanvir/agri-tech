import axios from "axios";

export const uploadPhotos = async (photos: File[]): Promise<string[]> => {

    const API_KEY = process.env.NEXT_PUBLIC_IMGBB_API_KEY;

    if (!API_KEY) {
        throw new Error('API key is missing. Please set the NEXT_PUBLIC_IMGBB_API_KEY environment variable.');
    }

    try {
        const uploadPromise = photos.map(async (photo) => {
            const formData = new FormData();
            formData.append("image", photo);
            const response = await axios.post(`https://api.imgbb.com/1/upload?key=${API_KEY}`, formData, { headers: { "Content-Type": "multipart/form-data" } });
            return response.data.data.display_url;
        });
        const imagesUrls = await Promise.all(uploadPromise)
        return imagesUrls

    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error("Axios error:", error.response?.data || error.message);
        } else {
            console.error("Error uploading images:", error);
        }
        throw new Error("Images upload failed");
    }
};
