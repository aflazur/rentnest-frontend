import { NextRequest, NextResponse } from "next/server";
import { ACCESS_TOKEN_COOKIE, USER_COOKIE } from "@/lib/config";
import type { Role } from "@/types";

const ROLE_HOME: Record<Role, string> = {
    TENANT: "/dashboard/tenant",
    LANDLORD: "/dashboard/landlord",
    ADMIN: "/dashboard/admin",
};

export function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;

    if (!pathname.startsWith("/dashboard")) {
        return NextResponse.next();
    }

    const token = req.cookies.get(ACCESS_TOKEN_COOKIE)?.value;
    const rawUser = req.cookies.get(USER_COOKIE)?.value;

    if (!token || !rawUser) {
        const loginUrl = new URL("/auth/login", req.url);
        loginUrl.searchParams.set("next", pathname);
        return NextResponse.redirect(loginUrl);
    }

    try {
        const user = JSON.parse(rawUser) as { role: Role };
        const section = pathname.split("/")[2]; // tenant | landlord | admin

        if (section && section.toUpperCase() !== user.role) {
            return NextResponse.redirect(new URL(ROLE_HOME[user.role], req.url));
        }
    } catch {
        const loginUrl = new URL("/auth/login", req.url);
        return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/dashboard/:path*"],
};