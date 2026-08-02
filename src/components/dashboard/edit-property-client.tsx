"use client";

import { useProperty } from "@/hooks/use-properties";
import { PropertyForm } from "@/components/dashboard/property-form";
import { Skeleton } from "@/components/ui/skeleton";

export function EditPropertyClient({ id }: { id: string }) {
    const { data, isLoading } = useProperty(id);

    return (
        <div className="mx-auto max-w-2xl px-5 py-10">
            <p className="font-mono text-xs uppercase tracking-widest text-gold">Landlord</p>
            <h1 className="mt-2 font-display text-3xl text-ink">Edit listing</h1>
            <div className="mt-8">
                {isLoading ? (
                    <Skeleton className="h-96 w-full" />
                ) : data?.data ? (
                    <PropertyForm property={data.data} />
                ) : (
                    <p className="text-sm text-ink/60">Property not found.</p>
                )}
            </div>
        </div>
    );
}