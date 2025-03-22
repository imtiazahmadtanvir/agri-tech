import axios from "axios";

// upload image and return url
interface ImageUploadResponse {
    data: {
        display_url: string;
    };
}

export const imageUpload = async (imagedata: File): Promise<string> => {
    const formData = new FormData();
    formData.append("image", imagedata);
    const { data } = await axios.post<ImageUploadResponse>(
        `https://api.imgbb.com/1/upload?key=${process.env.IMAGE_API_KET}`,
        formData
    );
    const image_url = data.data.display_url;
    return image_url;
};
