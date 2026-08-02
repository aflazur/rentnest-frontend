"use client";

import Link from "next/link";
import { Building2 } from "lucide-react";
import { useAdminProperties } from "@/hooks/use-admin";
import { EmptyState } from "@/components/ui/empty-state";
import { Skeleton } from "@/components/ui/skeleton";
import { StatusBadge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";

export function AdminProperties() {
    const { data: properties, isLoading } = useAdminProperties();

    if (isLoading) {
        return (
            <div className="space-y-2">
                {Array.from({ length: 5 }).map((_, i) => (
                    <Skeleton key={i} className="h-14 w-full" />
                ))}
            </div>
        );
    }

    if (!properties || properties.length === 0) {
        return <EmptyState icon={Building2} title="No properties found" />;
    }

    return (
        <div className="overflow-x-auto rounded-md border border-line bg-white/60">
            <table className="w-full text-left text-sm">
                <thead className="border-b border-line text-xs uppercase tracking-wide text-ink/50">
                    <tr>
                        <th className="px-4 py-3">Title</th>
                        <th className="px-4 py-3">City</th>
                        <th className="px-4 py-3">Price</th>
                        <th className="px-4 py-3">Landlord</th>
                        <th className="px-4 py-3">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {properties.map((p) => (
                        <tr key={p.id} className="border-b border-line last:border-0">
                            <td className="px-4 py-3">
                                <Link href={`/properties/${p.id}`} className="font-medium text-ink hover:text-pine">
                                    {p.title}
                                </Link>
                            </td>
                            <td className="px-4 py-3 text-ink/70">{p.city}</td>
                            <td className="px-4 py-3 text-ink/70">{formatCurrency(p.price)}</td>
                            <td className="px-4 py-3 text-ink/70">{p.landlord?.name ?? "—"}</td>
                            <td className="px-4 py-3">
                                <StatusBadge status={p.status} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}