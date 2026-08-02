import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const url = new URL("/payment/cancel", req.url);
    req.nextUrl.searchParams.forEach((value, key) => url.searchParams.set(key, value));
    return NextResponse.redirect(url);
}