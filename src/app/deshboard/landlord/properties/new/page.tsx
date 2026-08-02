import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { PropertyForm } from "@/components/dashboard/property-form";

export const metadata: Metadata = { title: "New listing — RentNest" };

export default function NewPropertyPage() {
    return (
        <div className="mx-auto max-w-2xl px-5 py-10">
            <Link href="/dashboard/landlord" className="flex items-center gap-1.5 text-sm text-ink/60 hover:text-pine">
                <ArrowLeft className="h-3.5 w-3.5" /> Back to dashboard
            </Link>
            <p className="mt-4 font-mono text-xs uppercase tracking-widest text-gold">Landlord</p>
            <h1 className="mt-2 font-display text-3xl text-ink">Create a new listing</h1>
            <div className="mt-8">
                <PropertyForm />
            </div>
        </div>
    );
}
