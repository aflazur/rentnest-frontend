import "server-only";
import { cookies } from "next/headers";
import { ACCESS_TOKEN_COOKIE, USER_COOKIE } from "@/lib/config";
import type { SessionUser } from "@/types";

/** Reads the current session (user + presence of an access token) from cookies.
 *  Server-only: used in Server Components / layout / middleware-adjacent code. */
export async function getSession(): Promise<SessionUser | null> {
    const store = await cookies();
    const token = store.get(ACCESS_TOKEN_COOKIE)?.value;
    const rawUser = store.get(USER_COOKIE)?.value;

    if (!token || !rawUser) return null;

    try {
        return JSON.parse(rawUser) as SessionUser;
    } catch {
        return null;
    }
}