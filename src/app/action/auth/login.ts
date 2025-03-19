"use server";

import dbConnect, { collectionNameObj } from "@/lib/dbConnect";
import bcrypt from "bcryptjs";

interface Payload {
    email: string;
    password: string;
}

export const loginUser = async (payload: Payload) => {
    console.log(payload);
    const { email, password } = payload;
    const userCollection = await dbConnect(collectionNameObj.userCollection);
    const user = await userCollection.findOne({ email });

    if (!user) return null;

    const isPasswordOk = await bcrypt.compare(password, user.password);

    if (!isPasswordOk) return null;

    return user;
};
