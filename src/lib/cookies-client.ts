"use client";

/** Minimal client-side cookie helpers. Cookies are set (non-httpOnly) by our
 *  own Next.js route handlers so the browser can attach the access token to
 *  cross-origin requests to the backend API. */
export function getClientCookie(name: string): string | null {
    if (typeof document === "undefined") return null;
    const match = document.cookie
        .split("; ")
        .find((row) => row.startsWith(`${name}=`));
    return match ? decodeURIComponent(match.split("=").slice(1).join("=")) : null;
}