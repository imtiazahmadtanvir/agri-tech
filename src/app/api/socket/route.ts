import { NextRequest, NextResponse } from "next/server";
import { Server } from "socket.io";

export async function GET(req: NextRequest) {
    if (!(global as any).io) {
        const io = new Server(3000, {
            cors: { origin: "*" }, // Allow all origins (for development)
        });

        (global as any).io = io; // Store in global scope to prevent multiple instances

        io.on("connection", (socket) => {
            console.log("Client connected:", socket.id);

            socket.on("message", (msg) => {
                console.log("Received message:", msg);
                io.emit("message", msg); // Broadcast to all clients
            });

            socket.on("disconnect", () => {
                console.log("Client disconnected:", socket.id);
            });
        });
    }

    return NextResponse.json({ message: "Socket.io Server Running" });
}
