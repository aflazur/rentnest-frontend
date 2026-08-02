import type { Metadata } from "next";
import { LandlordRequests } from "@/components/dashboard/landlord-requests";

export const metadata: Metadata = { title: "Rental Requests — RentNest" };

export default function LandlordRequestsPage() {
    return (
        <div className="mx-auto max-w-5xl px-5 py-10">
            <p className="font-mono text-xs uppercase tracking-widest text-gold">Landlord</p>
            <h1 className="mt-2 font-display text-3xl text-ink">Rental requests</h1>
            <p className="mt-2 text-sm text-ink/60">Approve or reject incoming requests.</p>
            <div className="mt-8">
                <LandlordRequests />
            </div>
        </div>
    );
}