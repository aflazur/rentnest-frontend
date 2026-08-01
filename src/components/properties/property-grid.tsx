"use client";

import { useSearchParams } from "next/navigation";
import { Home } from "lucide-react";
import { useProperties } from "@/hooks/use-properties";
import { PropertyCard } from "@/components/properties/property-card";
import { PropertyCardSkeleton } from "@/components/ui/skeleton";
import { EmptyState } from "@/components/ui/empty-state";

export function PropertyGrid() {
    const searchParams = useSearchParams();

    const { data, isLoading, isError } = useProperties({
        city: searchParams.get("city") ?? undefined,
        type: searchParams.get("type") ?? undefined,
        minPrice: searchParams.get("minPrice") ?? undefined,
        maxPrice: searchParams.get("maxPrice") ?? undefined,
    });

    if (isLoading) {
        return (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 6 }).map((_, i) => (
                    <PropertyCardSkeleton key={i} />
                ))}
            </div>
        );
    }

    if (isError) {
        return (
            <EmptyState
                icon={Home}
                title="Couldn't load properties"
                description="Something went wrong reaching the server. Please try again."
            />
        );
    }

    const properties = data?.data ?? [];

    if (properties.length === 0) {
        return (
            <EmptyState
                icon={Home}
                title="No properties match your search"
                description="Try widening your filters — a different city or a broader price range."
            />
        );
    }

    return (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {properties.map((property) => (
                <PropertyCard key={property.id} property={property} />
            ))}
        </div>
    );
}