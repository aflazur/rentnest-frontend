"use client";

import { ClipboardList } from "lucide-react";
import { useAdminRentals } from "@/hooks/use-admin";
import { EmptyState } from "@/components/ui/empty-state";
import { Skeleton } from "@/components/ui/skeleton";
import { StatusBadge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";

export function AdminRentals() {
    const { data: rentals, isLoading } = useAdminRentals();

    if (isLoading) {
        return (
            <div className="space-y-2">
                {Array.from({ length: 5 }).map((_, i) => (
                    <Skeleton key={i} className="h-14 w-full" />
                ))}
            </div>
        );
    }

    if (!rentals || rentals.length === 0) {
        return <EmptyState icon={ClipboardList} title="No rental requests found" />;
    }

    return (
        <div className="overflow-x-auto rounded-md border border-line bg-white/60">
            <table className="w-full text-left text-sm">
                <thead className="border-b border-line text-xs uppercase tracking-wide text-ink/50">
                    <tr>
                        <th className="px-4 py-3">Property</th>
                        <th className="px-4 py-3">Tenant</th>
                        <th className="px-4 py-3">Move-in</th>
                        <th className="px-4 py-3">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {rentals.map((r) => (
                        <tr key={r.id} className="border-b border-line last:border-0">
                            <td className="px-4 py-3 font-medium text-ink">{r.property?.title ?? "—"}</td>
                            <td className="px-4 py-3 text-ink/70">{r.tenant?.name ?? "—"}</td>
                            <td className="px-4 py-3 text-ink/70">{formatDate(r.moveInDate)}</td>
                            <td className="px-4 py-3">
                                <StatusBadge status={r.status} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}