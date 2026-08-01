import Link from "next/link";
import { Home } from "lucide-react";
import type { SessionUser } from "@/types";
import { NavAuthArea } from "@/components/layout/nav-auth-area";

const ROLE_HOME: Record<string, string> = {
    TENANT: "/dashboard/tenant",
    LANDLORD: "/dashboard/landlord",
    ADMIN: "/dashboard/admin",
};

export function Navbar({ user }: { user: SessionUser | null }) {
    return (
        <header className="sticky top-0 z-40 border-b border-line bg-paper/90 backdrop-blur">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
                <Link href="/" className="flex items-center gap-2">
                    <span className="flex h-8 w-8 items-center justify-center rounded-sm bg-pine text-paper">
                        <Home className="h-4 w-4" strokeWidth={2} />
                    </span>
                    <span className="font-display text-xl tracking-tight text-ink">RentNest</span>
                </Link>

                <nav className="hidden items-center gap-6 text-sm text-ink/70 md:flex">
                    <Link href="/properties" className="hover:text-pine">
                        Browse Properties
                    </Link>
                    {user && (
                        <Link href={ROLE_HOME[user.role]} className="hover:text-pine">
                            Dashboard
                        </Link>
                    )}
                </nav>

                <NavAuthArea user={user} />
            </div>
        </header>
    );
}