import type { Metadata } from "next";
import { PropertyForm } from "@/components/dashboard/property-form";

export const metadata: Metadata = { title: "New listing — RentNest" };

export default function NewPropertyPage() {
    return (
        <div className="mx-auto max-w-2xl px-5 py-10">
            <p className="font-mono text-xs uppercase tracking-widest text-gold">Landlord</p>
            <h1 className="mt-2 font-display text-3xl text-ink">Create a new listing</h1>
            <div className="mt-8">
                <PropertyForm />
            </div>
        </div>
    );
}