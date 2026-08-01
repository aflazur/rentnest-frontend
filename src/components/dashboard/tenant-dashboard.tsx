"use client";

import Link from "next/link";
import { Home, CreditCard } from "lucide-react";
import { useMyRentalRequests } from "@/hooks/use-rentals";
import { useMyPayments } from "@/hooks/use-payments";
import { StatusBadge } from "@/components/ui/badge";
import { EmptyState } from "@/components/ui/empty-state";
import { Skeleton } from "@/components/ui/skeleton";
import { Button, LinkButton } from "@/components/ui/button";
import { formatCurrency, formatDate } from "@/lib/utils";
import { LeaveReviewModal } from "@/components/dashboard/leave-review-modal";

export function TenantDashboard() {
    const { data: requests, isLoading } = useMyRentalRequests();
    const { data: payments } = useMyPayments();

    if (isLoading) {
        return (
            <div className="space-y-3">
                {Array.from({ length: 3 }).map((_, i) => (
                    <Skeleton key={i} className="h-24 w-full" />
                ))}
            </div>
        );
    }

    if (!requests || requests.length === 0) {
        return (
            <EmptyState
                icon={Home}
                title="No rental requests yet"
                description="Browse properties and send a request to get started."
                action={
                    <LinkButton href="/properties" size="sm">
                        Browse properties
                    </LinkButton>
                }
            />
        );
    }

    return (
        <div className="space-y-8">
            <div className="space-y-3">
                {requests.map((r) => (
                    <div
                        key={r.id}
                        className="flex flex-col gap-3 rounded-md border border-line bg-white/60 p-4 sm:flex-row sm:items-center sm:justify-between"
                    >
                        <div>
                            <Link
                                href={`/properties/${r.propertyId}`}
                                className="font-display text-lg text-ink hover:text-pine"
                            >
                                {r.property?.title ?? "Property"}
                            </Link>
                            <p className="mt-1 text-sm text-ink/60">
                                {r.property?.city} · Move-in {formatDate(r.moveInDate)}
                            </p>
                            {r.status === "REJECTED" && r.rejectReason && (
                                <p className="mt-1 text-xs text-red">Reason: {r.rejectReason}</p>
                            )}
                        </div>
                        <div className="flex items-center gap-3">
                            <StatusBadge status={r.status} />
                            {r.status === "APPROVED" && !r.payment && (
                                <LinkButton href={`/dashboard/tenant/requests/${r.id}/pay`} size="sm">
                                    <CreditCard className="h-3.5 w-3.5" />
                                    Pay now
                                </LinkButton>
                            )}
                            {(r.status === "ACTIVE" || r.status === "COMPLETED") && (
                                <LeaveReviewModal
                                    rentalRequestId={r.id}
                                    trigger={(open) => (
                                        <Button variant="outline" size="sm" onClick={open}>
                                            Leave review
                                        </Button>
                                    )}
                                />
                            )}
                        </div>
                    </div>
                ))}
            </div>

            <div>
                <h2 className="font-display text-xl text-ink">Payment history</h2>
                {!payments || payments.length === 0 ? (
                    <p className="mt-3 text-sm text-ink/50">No payments yet.</p>
                ) : (
                    <div className="mt-3 overflow-x-auto rounded-md border border-line bg-white/60">
                        <table className="w-full text-left text-sm">
                            <thead className="border-b border-line text-xs uppercase tracking-wide text-ink/50">
                                <tr>
                                    <th className="px-4 py-3">Transaction</th>
                                    <th className="px-4 py-3">Amount</th>
                                    <th className="px-4 py-3">Status</th>
                                    <th className="px-4 py-3">Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {payments.map((p) => (
                                    <tr key={p.id} className="border-b border-line last:border-0">
                                        <td className="px-4 py-3 font-mono text-xs">{p.transactionId}</td>
                                        <td className="px-4 py-3">{formatCurrency(p.amount)}</td>
                                        <td className="px-4 py-3">
                                            <StatusBadge status={p.status} />
                                        </td>
                                        <td className="px-4 py-3 text-ink/60">
                                            {p.paidAt ? formatDate(p.paidAt) : "—"}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}