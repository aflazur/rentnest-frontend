import type { Metadata } from "next";
import Link from "next/link";
import { LandlordProperties } from "@/components/dashboard/landlord-properties";

export const metadata: Metadata = { title: "Landlord Dashboard — RentNest" };

export default function LandlordDashboardPage() {
    return (
        <div className="mx-auto max-w-5xl px-5 py-10">
            <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                    <p className="font-mono text-xs uppercase tracking-widest text-gold">Landlord</p>
                    <h1 className="mt-2 font-display text-3xl text-ink">Your properties</h1>
                </div>
                <Link
                    href="/dashboard/landlord/requests"
                    className="text-sm font-medium text-pine hover:underline"
                >
                    View rental requests →
                </Link>
            </div>
            <div className="mt-8">
                <LandlordProperties />
            </div>
        </div>
    );
}