import type { Metadata } from "next";
import { Suspense } from "react";
import { PropertyFilters } from "@/components/properties/property-filters";
import { PropertyGrid } from "@/components/properties/property-grid";
import { PropertyCardSkeleton } from "@/components/ui/skeleton";

export const metadata: Metadata = { title: "Browse Properties — RentNest" };

export default function PropertiesPage() {
    return (
        <div className="mx-auto max-w-6xl px-5 py-10">
            <p className="font-mono text-xs uppercase tracking-widest text-gold">Listings</p>
            <h1 className="mt-2 font-display text-3xl text-ink">Browse rental properties</h1>
            <p className="mt-2 max-w-xl text-sm text-ink/60">
                Filter by city, type, and price to find a place that fits.
            </p>

            <div className="mt-8">
                <Suspense>
                    <PropertyFilters />
                </Suspense>
            </div>

            <div className="mt-8">
                <Suspense
                    fallback={
                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                            {Array.from({ length: 6 }).map((_, i) => (
                                <PropertyCardSkeleton key={i} />
                            ))}
                        </div>
                    }
                >
                    <PropertyGrid />
                </Suspense>
            </div>
        </div>
    );
}