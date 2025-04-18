import { NextResponse } from "next/server";

export const GET = async (
    req: Request,
    { params }: { params: { id: string } }
) => {
    const resolvedParams = await params;
    const { id } = resolvedParams
    console.log(id);
    try {

        return NextResponse.json({ message: "Check console" });
    } catch (error) {
        return NextResponse.json({ message: "Something went wrong", }, { status: 500 });
    }
};
