"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import type { SessionUser } from "@/types";

const ROLE_HOME: Record<string, string> = {
    TENANT: "/dashboard/tenant",
    LANDLORD: "/dashboard/landlord",
    ADMIN: "/dashboard/admin",
};

export function MobileNav({ user }: { user: SessionUser | null }) {
    const [open, setOpen] = useState(false);

    return (
        <div className="md:hidden">
            <button
                onClick={() => setOpen((v) => !v)}
                aria-label={open ? "Close menu" : "Open menu"}
                aria-expanded={open}
                className="rounded-sm p-2 text-ink hover:bg-paper-dim"
            >
                {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>

            {open && (
                <div className="absolute inset-x-0 top-full border-b border-line bg-paper px-5 py-4 shadow-sm">
                    <nav className="flex flex-col gap-3 text-sm text-ink/80">
                        <Link href="/properties" onClick={() => setOpen(false)}>
                            Browse Properties
                        </Link>
                        {user && (
                            <Link href={ROLE_HOME[user.role]} onClick={() => setOpen(false)}>
                                Dashboard
                            </Link>
                        )}
                    </nav>
                </div>
            )}
        </div>
    );
}