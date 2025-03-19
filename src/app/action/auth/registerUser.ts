"use server";
import { collectionNameObj } from './../../../lib/dbConnect';
import dbConnect from "@/lib/dbConnect";
import bcrypt from 'bcryptjs';

interface Payload {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: string;
}

export const registerUser = async (payload: Payload) => {
    const { email, password, role } = payload;
    console.log(payload);

    try {
        // Connect to the database
        const userCollection = await dbConnect(collectionNameObj.userCollection);

        // Check if the user already exists
        const existentUser = await userCollection.findOne({ email });
        if (existentUser) {
            return { success: false, message: "User already exists!" };
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert the user into the database with role
        const result = await userCollection.insertOne({
            ...payload,
            password: hashedPassword,
            role: role || "farmer",
        });

        return {
            success: true,
            acknowledged: result.acknowledged,
            insertedId: result.insertedId.toString(),
        };
    } catch (error) {
        console.error("Error during user registration:", error);
        return { success: false, message: "Error during registration. Please try again later." };
    }
};
