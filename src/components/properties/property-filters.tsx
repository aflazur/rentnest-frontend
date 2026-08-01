"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useState } from "react";
import { Search } from "lucide-react";
import { Input, Select } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const TYPES = ["APARTMENT", "HOUSE", "STUDIO", "CONDO", "ROOM"];

export function PropertyFilters() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [city, setCity] = useState(searchParams.get("city") ?? "");
    const [type, setType] = useState(searchParams.get("type") ?? "");
    const [minPrice, setMinPrice] = useState(searchParams.get("minPrice") ?? "");
    const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") ?? "");

    function apply(e: React.FormEvent) {
        e.preventDefault();
        const params = new URLSearchParams();
        if (city) params.set("city", city);
        if (type) params.set("type", type);
        if (minPrice) params.set("minPrice", minPrice);
        if (maxPrice) params.set("maxPrice", maxPrice);
        router.push(`${pathname}?${params.toString()}`);
    }

    return (
        <form
            onSubmit={apply}
            className="grid grid-cols-2 gap-3 rounded-md border border-line bg-white/60 p-4 sm:grid-cols-3 lg:grid-cols-5 lg:items-end"
        >
            <div className="col-span-2 lg:col-span-1">
                <label className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-ink/70">
                    City
                </label>
                <Input
                    placeholder="Dhaka"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                />
            </div>
            <div>
                <label className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-ink/70">
                    Type
                </label>
                <Select value={type} onChange={(e) => setType(e.target.value)}>
                    <option value="">Any</option>
                    {TYPES.map((t) => (
                        <option key={t} value={t}>
                            {t.charAt(0) + t.slice(1).toLowerCase()}
                        </option>
                    ))}
                </Select>
            </div>
            <div>
                <label className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-ink/70">
                    Min price
                </label>
                <Input
                    type="number"
                    placeholder="0"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                />
            </div>
            <div>
                <label className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-ink/70">
                    Max price
                </label>
                <Input
                    type="number"
                    placeholder="50000"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                />
            </div>
            <Button type="submit" className="h-fit">
                <Search className="h-4 w-4" />
                Search
            </Button>
        </form>
    );
} 