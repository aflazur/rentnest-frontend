"use client";

import { useRouter } from "next/navigation";
import { LogOut, User as UserIcon } from "lucide-react";
import type { SessionUser } from "@/types";
import { LinkButton } from "@/components/ui/button";
import { toast } from "sonner";

export function NavAuthArea({ user }: { user: SessionUser | null }) {
    const router = useRouter();

    async function handleLogout() {
        await fetch("/api/auth/logout", { method: "POST" });
        toast.success("Logged out");
        router.push("/");
        router.refresh();
    }

    if (!user) {
        return (
            <div className="flex items-center gap-3">
                <LinkButton href="/auth/login" variant="ghost" size="sm">
                    Log in
                </LinkButton>
                <LinkButton href="/auth/register" variant="primary" size="sm">
                    Get started
                </LinkButton>
            </div>
        );
    }

    return (
        <div className="flex items-center gap-3">
            <span className="hidden items-center gap-1.5 text-sm text-ink/70 sm:flex">
                <UserIcon className="h-3.5 w-3.5" />
                {user.name.split(" ")[0]}
            </span>
            <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 rounded-sm px-3 py-1.5 text-sm text-ink/70 hover:bg-paper-dim hover:text-ink"
            >
                <LogOut className="h-3.5 w-3.5" />
                Log out
            </button>
        </div>
    );
}