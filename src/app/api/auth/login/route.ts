import { NextRequest, NextResponse } from "next/server";
import { API_BASE_URL } from "@/lib/config";
import { setSessionCookies } from "@/lib/auth-cookies";

export async function POST(req: NextRequest) {
    const body = await req.json();

    const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
    });

    const json = await res.json();

    if (!res.ok || !json.success) {
        return NextResponse.json(json, { status: res.status });
    }

    await setSessionCookies(json.data.accessToken, json.data.user);

    return NextResponse.json(json, { status: res.status });
}