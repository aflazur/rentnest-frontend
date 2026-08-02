"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function DashboardTabs({
    tabs,
}: {
    tabs: { href: string; label: string }[];
}) {
    const pathname = usePathname();

    return (
        <div className="flex gap-1 border-b border-line">
            {tabs.map((tab) => {
                const active = pathname === tab.href;
                return (
                    <Link
                        key={tab.href}
                        href={tab.href}
                        className={cn(
                            "border-b-2 px-3 py-2 text-sm font-medium transition-colors",
                            active
                                ? "border-pine text-pine"
                                : "border-transparent text-ink/60 hover:text-ink"
                        )}
                    >
                        {tab.label}
                    </Link>
                );
            })}
        </div>
    );
}