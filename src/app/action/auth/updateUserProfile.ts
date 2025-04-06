"use server";

import { authOptions } from "@/lib/auth";
import dbConnect, { collectionNameObj } from "@/lib/dbConnect";
import { getServerSession } from "next-auth";

interface ProfileData {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    village: string;
    district: string;
    state: string;
    landSize: string;
    crops: string[];
}

export async function updateUserProfile(data: ProfileData) {
    try {
        const userData = await getServerSession(authOptions)
        if (data.crops.length === 0) {
            return { success: false, message: "Please select at least one crop" };
        }

        const userCollection = await dbConnect(collectionNameObj.userCollection);
        const updateResult = await userCollection.updateOne(
            { email: userData?.user.email },
            {
                $set: {
                    location: { village: data.village, district: data.district, state: data.state },
                    farmSize: parseFloat(data.landSize),
                    firstName: data.firstName,
                    lastName: data.lastName,
                    phoneNumber: data.phoneNumber,
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