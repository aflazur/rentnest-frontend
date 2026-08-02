"use client";

import Link from "next/link";
import { Building2, Pencil, Trash2, Plus } from "lucide-react";
import { useLandlordProperties, useDeleteProperty } from "@/hooks/use-landlord-properties";
import { EmptyState } from "@/components/ui/empty-state";
import { Skeleton } from "@/components/ui/skeleton";
import { Button, LinkButton } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";

export function LandlordProperties() {
    const { data: properties, isLoading } = useLandlordProperties();
    const del = useDeleteProperty();

    if (isLoading) {
        return (
            <div className="space-y-3">
                {Array.from({ length: 3 }).map((_, i) => (
                    <Skeleton key={i} className="h-20 w-full" />
                ))}
            </div>
        );
    }

    return (
        <div>
            <div className="flex items-center justify-between">
                <h2 className="font-display text-xl text-ink">Your listings</h2>
                <LinkButton href="/dashboard/landlord/properties/new" size="sm">
                    <Plus className="h-3.5 w-3.5" /> New listing
                </LinkButton>
            </div>

            {!properties || properties.length === 0 ? (
                <div className="mt-4">
                    <EmptyState
                        icon={Building2}
                        title="No properties listed yet"
                        description="Create your first listing to start receiving rental requests."
                    />
                </div>
            ) : (
                <div className="mt-4 space-y-3">
                    {properties.map((p) => (
                        <div
                            key={p.id}
                            className="flex flex-col gap-3 rounded-md border border-line bg-white/60 p-4 sm:flex-row sm:items-center sm:justify-between"
                        >
                            <div>
                                <Link href={`/properties/${p.id}`} className="font-medium text-ink hover:text-pine">
                                    {p.title}
                                </Link>
                                <p className="text-sm text-ink/60">
                                    {p.city} · {formatCurrency(p.price)}/mo
                                </p>
                            </div>
                            <div className="flex items-center gap-2">
                                <StatusBadge status={p.status} />
                                <LinkButton
                                    href={`/dashboard/landlord/properties/${p.id}/edit`}
                                    variant="ghost"
                                    size="sm"
                                >
                                    <Pencil className="h-3.5 w-3.5" />
                                </LinkButton>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => {
                                        if (confirm(`Remove "${p.title}"? This cannot be undone.`)) {
                                            del.mutate(p.id);
                                        }
                                    }}
                                >
                                    <Trash2 className="h-3.5 w-3.5 text-red" />
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}