"use server";

import dbConnect, { collectionNameObj } from "@/lib/dbConnect";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";

interface Payload {
    email: string;
    password: string;
}

export const loginUser = async (payload: Payload) => {
    const { email, password } = payload;
    const userCollection = await dbConnect(collectionNameObj.userCollection);
    const user = await userCollection.findOne({ email });

    if (!user) return null;

    const isPasswordOk = await bcrypt.compare(password, user.password);
    if (!isPasswordOk) return null;

    revalidatePath("/");

    return {
        _id: user._id.toString(),
        name: user.name,
        email: user.email,
        isProfileComplete: user.isProfileComplete || false,
        role: user.role || "user",
    };
};