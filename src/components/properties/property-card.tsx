import Link from "next/link";
import Image from "next/image";
import { BedDouble, Bath, MapPin } from "lucide-react";
import type { Property } from "@/types";
import { formatCurrency } from "@/lib/utils";
import { StatusBadge } from "@/components/ui/badge";

export function PropertyCard({ property }: { property: Property }) {
    const image = property.images?.[0];

    return (
        <Link
            href={`/properties/${property.id}`}
            className="group block overflow-hidden rounded-md border border-line bg-white/60 transition-shadow hover:shadow-[0_8px_24px_-12px_rgba(20,37,31,0.25)]"
        >
            <div className="relative h-44 w-full overflow-hidden bg-paper-dim">
                {image ? (
                    <Image
                        src={image}
                        alt={property.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                ) : (
                    <div className="flex h-full items-center justify-center text-ink/30">
                        <MapPin className="h-8 w-8" strokeWidth={1.5} />
                    </div>
                )}
                <span className="absolute left-3 top-3">
                    <span className="tag-badge">{formatCurrency(property.price)}/mo</span>
                </span>
                {property.status !== "AVAILABLE" && (
                    <span className="absolute right-3 top-3">
                        <StatusBadge status={property.status} />
                    </span>
                )}
            </div>

            <div className="space-y-2 p-4">
                <p className="font-display text-lg leading-tight text-ink">{property.title}</p>
                <p className="flex items-center gap-1 text-sm text-ink/60">
                    <MapPin className="h-3.5 w-3.5" />
                    {property.area}, {property.city}
                </p>
                <div className="flex items-center gap-4 pt-1 text-sm text-ink/70">
                    <span className="flex items-center gap-1">
                        <BedDouble className="h-4 w-4" /> {property.bedrooms}
                    </span>
                    <span className="flex items-center gap-1">
                        <Bath className="h-4 w-4" /> {property.bathrooms}
                    </span>
                    {property.category?.name && (
                        <span className="font-mono text-xs text-ink/50">{property.category.name}</span>
                    )}
                </div>
            </div>
        </Link>
    );
}