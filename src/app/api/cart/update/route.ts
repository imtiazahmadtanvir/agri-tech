import { NextRequest } from "next/server";

export const PATCH = async (req: NextRequest) => {
    const { quantity } = await req.json()
    console.log(quantity);
}