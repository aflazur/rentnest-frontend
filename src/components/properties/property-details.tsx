"use client";

import Image from "next/image";
import Link from "next/link";
import { BedDouble, Bath, Ruler, MapPin, User, Star } from "lucide-react";
import { useProperty } from "@/hooks/use-properties";
import { usePropertyReviews } from "@/hooks/use-reviews";
import { formatCurrency, formatDate } from "@/lib/utils";
import { StatusBadge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { RequestRentModal } from "@/components/properties/request-rent-modal";
import { Button } from "@/components/ui/button";
import type { SessionUser } from "@/types";

export function PropertyDetails({ id, session }: { id: string; session: SessionUser | null }) {
    const { data, isLoading } = useProperty(id);
    const { data: reviews } = usePropertyReviews(id);

    if (isLoading) {
        return (
            <div className="mx-auto max-w-4xl px-5 py-10">
                <Skeleton className="h-72 w-full" />
                <Skeleton className="mt-4 h-8 w-1/2" />
                <Skeleton className="mt-2 h-4 w-1/3" />
            </div>
        );
    }

    const property = data?.data;
    if (!property) {
        return (
            <div className="mx-auto max-w-4xl px-5 py-16 text-center">
                <p className="font-display text-2xl text-ink">Property not found</p>
                <p className="mt-2 text-sm text-ink/60">It may have been removed by the landlord.</p>
            </div>
        );
    }

    const canRequest = session?.role === "TENANT" && property.status === "AVAILABLE";

    return (
        <div className="mx-auto max-w-4xl px-5 py-10">
            <div className="relative h-80 w-full overflow-hidden rounded-md bg-paper-dim">
                {property.images?.[0] ? (
                    <Image src={property.images[0]} alt={property.title} fill className="object-cover" />
                ) : (
                    <div className="flex h-full items-center justify-center text-ink/30">
                        <MapPin className="h-10 w-10" strokeWidth={1.5} />
                    </div>
                )}
                <span className="absolute left-4 top-4">
                    <span className="tag-badge text-sm">{formatCurrency(property.price)}/mo</span>
                </span>
            </div>

            <div className="mt-6 flex flex-wrap items-start justify-between gap-4">
                <div>
                    <p className="font-mono text-xs uppercase tracking-widest text-gold">
                        {property.category?.name ?? property.type}
                    </p>
                    <h1 className="mt-1 font-display text-3xl text-ink">{property.title}</h1>
                    <p className="mt-1 flex items-center gap-1 text-sm text-ink/60">
                        <MapPin className="h-4 w-4" />
                        {property.address}, {property.area}, {property.city}
                    </p>
                </div>
                <StatusBadge status={property.status} />
            </div>

            <div className="mt-6 flex flex-wrap gap-6 border-y border-line py-4 text-sm text-ink/70">
                <span className="flex items-center gap-2">
                    <BedDouble className="h-4 w-4" /> {property.bedrooms} bedrooms
                </span>
                <span className="flex items-center gap-2">
                    <Bath className="h-4 w-4" /> {property.bathrooms} bathrooms
                </span>
                {property.sizeSqft ? (
                    <span className="flex items-center gap-2">
                        <Ruler className="h-4 w-4" /> {property.sizeSqft} sqft
                    </span>
                ) : null}
            </div>

            <div className="mt-6">
                <h2 className="font-display text-xl text-ink">Description</h2>
                <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-ink/70">
                    {property.description}
                </p>
            </div>

            {property.amenities?.length > 0 && (
                <div className="mt-6">
                    <h2 className="font-display text-xl text-ink">Amenities</h2>
                    <div className="mt-2 flex flex-wrap gap-2">
                        {property.amenities.map((a) => (
                            <span
                                key={a}
                                className="rounded-full border border-line px-3 py-1 text-xs text-ink/70"
                            >
                                {a}
                            </span>
                        ))}
                    </div>
                </div>
            )}

            {property.landlord && (
                <div className="mt-6 flex items-center gap-3 rounded-md border border-line bg-white/60 p-4">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-pine/10 text-pine">
                        <User className="h-4 w-4" />
                    </span>
                    <div className="text-sm">
                        <p className="font-medium text-ink">{property.landlord.name}</p>
                        <p className="text-ink/60">Listed by this landlord</p>
                    </div>
                </div>
            )}

            <div className="mt-6">
                {canRequest && (
                    <RequestRentModal
                        propertyId={property.id}
                        trigger={(open) => (
                            <Button onClick={open} size="lg">
                                Request to rent
                            </Button>
                        )}
                    />
                )}
                {!session && (
                    <p className="text-sm text-ink/60">
                        <Link href="/auth/login" className="font-medium text-pine hover:underline">
                            Log in
                        </Link>{" "}
                        as a tenant to request this property.
                    </p>
                )}
                {session?.role === "LANDLORD" && (
                    <p className="text-sm text-ink/50">Landlords cannot request to rent properties.</p>
                )}
                {property.status !== "AVAILABLE" && session?.role === "TENANT" && (
                    <p className="text-sm text-ink/50">This property is currently not available.</p>
                )}
            </div>

            <div className="mt-10">
                <h2 className="font-display text-xl text-ink">Reviews</h2>
                <div className="mt-3 space-y-3">
                    {(!reviews || reviews.length === 0) && (
                        <p className="text-sm text-ink/50">No reviews yet.</p>
                    )}
                    {reviews?.map((r) => (
                        <div key={r.id} className="rounded-md border border-line bg-white/60 p-4">
                            <div className="flex items-center justify-between">
                                <p className="text-sm font-medium text-ink">{r.tenant?.name ?? "Tenant"}</p>
                                <span className="flex items-center gap-1 text-xs text-gold">
                                    <Star className="h-3.5 w-3.5 fill-gold text-gold" /> {r.rating}/5
                                </span>
                            </div>
                            <p className="mt-1 text-sm text-ink/70">{r.comment}</p>
                            <p className="mt-1 font-mono text-xs text-ink/40">{formatDate(r.createdAt)}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}