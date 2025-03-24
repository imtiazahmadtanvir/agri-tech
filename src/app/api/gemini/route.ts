// app/api/gemini/route.ts
import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

type GeminiResponse = { text: string } | { error: string };

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY as string);

export async function POST(request: Request): Promise<NextResponse<GeminiResponse>> {
    try {
        const formData = await request.formData();
        const rawPrompt = (formData.get("prompt") as string) || "";
        const image = formData.get("image") as File | null;

        // Enhanced default prompt 
        const defaultPrompt = image
            ? "Analyze this crop image for signs of disease (e.g., yellowing, spots) or pest damage, and suggest possible causes or treatments."
            : "Provide information about common agricultural issues.";
        const prompt = rawPrompt || defaultPrompt;

        if (!process.env.GOOGLE_API_KEY) {
            return NextResponse.json({ error: "API key is not configured" }, { status: 500 });
        }

        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        if (!image && !rawPrompt) {
            return NextResponse.json({ error: "Prompt or image is required" }, { status: 400 });
        }

        if (image) {
            const imageBuffer = Buffer.from(await image.arrayBuffer());
            const base64Image = imageBuffer.toString("base64");
            const imageData = {
                inlineData: {
                    mimeType: image.type,
                    data: base64Image,
                },
            };
            const result = await model.generateContent([prompt, imageData]);
            return NextResponse.json({ text: result.response.text() });
        } else {
            const result = await model.generateContent(prompt);
            return NextResponse.json({ text: result.response.text() });
        }
    } catch (error) {
        console.error("Error with Gemini API:", error);
        return NextResponse.json(
            { error: "Failed to process request: " + (error instanceof Error ? error.message : String(error)) },
            { status: 500 }
        );
    }
}