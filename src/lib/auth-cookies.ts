import "server-only";
import { cookies } from "next/headers";
import { ACCESS_TOKEN_COOKIE, USER_COOKIE } from "@/lib/config";
import type { SessionUser } from "@/types";

const ONE_DAY = 60 * 60 * 24;
export async function setSessionCookies(accessToken: string, user: SessionUser) {
    const store = await cookies();
    const opts = {
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax" as const,
        path: "/",
        maxAge: ONE_DAY,
    };
    store.set(ACCESS_TOKEN_COOKIE, accessToken, opts);
    store.set(USER_COOKIE, JSON.stringify(user), opts);
}

export async function clearSessionCookies() {
    const store = await cookies();
    store.delete(ACCESS_TOKEN_COOKIE);
    store.delete(USER_COOKIE);
}