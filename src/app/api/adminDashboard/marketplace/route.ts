import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"

export const GET = async (res: Request) => {
    try {
        const session = await getServerSession(authOptions)
        if (session?.user.role !== "admin") {
            return NextResponse.json({
                message: 'unauthorize access'
            }, { status: 401 })
        }
        console.log(session?.user.role);
        return NextResponse.json({ success: true, message: "welcome" }, { status: 200 })

    } catch (error) {
        console.log("error in dashboard get marketplace route", error);
        return NextResponse.json({
            message: "internal server error"
        }, { status: 500 })

    }
}