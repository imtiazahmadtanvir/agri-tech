import axios from "axios";
interface ImageUploadResponse {
    data: {
        display_url: string;
    };
}


export const imageUpload = async (imageData: File): Promise<string> => {
    try {
        const formData = new FormData();
        formData.append("image", imageData);

        const apiKey = "12314178c6266e7d92e57707e74a496e";
        console.log(apiKey);
        if (!apiKey) {
            throw new Error("Image API key is not defined in environment variables.");
        }

        const response = await axios.post<ImageUploadResponse>(
            `https://api.imgbb.com/1/upload?key=${apiKey}`,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );

        const imageUrl = response.data.data.display_url;
        return imageUrl;
    } catch (error) {
        console.error("Error uploading image:", error);
        throw new Error("Failed to upload image. Please try again.");
    }
};