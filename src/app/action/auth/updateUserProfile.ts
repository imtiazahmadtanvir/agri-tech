"use server";

import dbConnect, { collectionNameObj } from "@/lib/dbConnect";

interface ProfileData {
    name: string;
    email: string;
    village: string;
    district: string;
    state: string;
    farmSize: string;
    crops: string[];
}

export async function updateUserProfile(data: ProfileData) {
    try {
        if (data.crops.length === 0) {
            return { success: false, message: "Please select at least one crop" };
        }

        const userCollection = await dbConnect(collectionNameObj.userCollection);
        const updateResult = await userCollection.updateOne(
            { email: data.email },
            {
                $set: {
                    location: { village: data.village, district: data.district, state: data.state },
                    farmSize: parseFloat(data.farmSize),
                    crops: data.crops,
                    isProfileComplete: true,
                },
            }
        );

        if (updateResult.modifiedCount === 0) {
            return { success: false, message: "Failed to update profile" };
        }

        return { success: true, message: "Profile updated successfully" };
    } catch (error) {
        console.error(error);
        return { success: false, message: "Profile update failed" };
    }
}