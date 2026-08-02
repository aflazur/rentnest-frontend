"use client";

import Link from "next/link";
import { Users, Building2, ClipboardList, ArrowRight } from "lucide-react";
import { useAdminUsers, useAdminProperties, useAdminRentals } from "@/hooks/use-admin";
import { Skeleton } from "@/components/ui/skeleton";

const CARDS = [
    { key: "users", label: "Total users", icon: Users, href: "/dashboard/admin/users" },
    { key: "properties", label: "Total properties", icon: Building2, href: "/dashboard/admin/properties" },
    { key: "rentals", label: "Rental requests", icon: ClipboardList, href: "/dashboard/admin/rentals" },
] as const;

export function AdminOverview() {
    const users = useAdminUsers();
    const properties = useAdminProperties();
    const rentals = useAdminRentals();

    const counts: Record<string, number | undefined> = {
        users: users.data?.length,
        properties: properties.data?.length,
        rentals: rentals.data?.length,
    };

    const loading = users.isLoading || properties.isLoading || rentals.isLoading;

    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {CARDS.map((card) => (
                <Link
                    key={card.key}
                    href={card.href}
                    className="group rounded-md border border-line bg-white/60 p-5 transition-colors hover:border-pine"
                >
                    <div className="flex items-center justify-between">
                        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-pine/10 text-pine">
                            <card.icon className="h-4 w-4" />
                        </span>
                        <ArrowRight className="h-4 w-4 text-ink/30 transition-transform group-hover:translate-x-1" />
                    </div>
                    <p className="mt-4 font-mono text-xs uppercase tracking-wide text-ink/50">
                        {card.label}
                    </p>
                    {loading ? (
                        <Skeleton className="mt-1 h-8 w-16" />
                    ) : (
                        <p className="mt-1 font-display text-3xl text-ink">{counts[card.key] ?? 0}</p>
                    )}
                </Link>
            ))}
        </div>
    );
}