import { NextResponse } from "next/server";
import { clearSessionCookies } from "@/lib/auth-cookies";

export async function POST() {
  await clearSessionCookies();
  return NextResponse.json({ success: true, message: "Logged out", data: null });
}