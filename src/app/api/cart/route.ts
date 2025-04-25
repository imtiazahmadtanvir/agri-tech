import { NextRequest } from "next/server";

export const POST = async (req: NextRequest) => {
    try {
        const { productId, quantity } = await req.json()
        console.log(productId);
    } catch (error) {

    }
}