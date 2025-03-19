"use server"; // Mark entire file as server-side

import { redirect } from "next/navigation";

export async function signOutAction(formData: FormData) {
    // Expire the session cookie
    const response = new Response(null, { status: 302, headers: { Location: "/login" } });
    response.headers.append(
        "Set-Cookie",
        "next-auth.session-token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly"
    );
    throw redirect("/login");
}