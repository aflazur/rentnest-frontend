"use client";

import { useState } from "react";
import { ClipboardList, Check, X } from "lucide-react";
import { useLandlordRequests, useUpdateRentalRequestStatus } from "@/hooks/use-rentals";
import { EmptyState } from "@/components/ui/empty-state";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/badge";
import { Modal } from "@/components/ui/modal";
import { Textarea, Label } from "@/components/ui/input";
import { formatDate } from "@/lib/utils";
import type { RentalRequest } from "@/types";

export function LandlordRequests() {
    const { data: requests, isLoading } = useLandlordRequests();
    const update = useUpdateRentalRequestStatus();
    const [rejecting, setRejecting] = useState<RentalRequest | null>(null);
    const [reason, setReason] = useState("");

    if (isLoading) {
        return (
            <div className="space-y-3">
                {Array.from({ length: 3 }).map((_, i) => (
                    <Skeleton key={i} className="h-20 w-full" />
                ))}
            </div>
        );
    }

    if (!requests || requests.length === 0) {
        return (
            <EmptyState
                icon={ClipboardList}
                title="No rental requests yet"
                description="Requests from tenants will show up here."
            />
        );
    }

    return (
        <div className="space-y-3">
            {requests.map((r) => (
                <div
                    key={r.id}
                    className="flex flex-col gap-3 rounded-md border border-line bg-white/60 p-4 sm:flex-row sm:items-center sm:justify-between"
                >
                    <div>
                        <p className="font-medium text-ink">{r.property?.title}</p>
                        <p className="text-sm text-ink/60">
                            {r.tenant?.name} · Move-in {formatDate(r.moveInDate)}
                        </p>
                        {r.message && <p className="mt-1 text-sm text-ink/50">&ldquo;{r.message}&rdquo;</p>}
                    </div>
                    <div className="flex items-center gap-2">
                        <StatusBadge status={r.status} />
                        {r.status === "PENDING" && (
                            <>
                                <Button
                                    size="sm"
                                    onClick={() => update.mutate({ id: r.id, status: "APPROVED" })}
                                    loading={update.isPending}
                                >
                                    <Check className="h-3.5 w-3.5" /> Approve
                                </Button>
                                <Button variant="outline" size="sm" onClick={() => setRejecting(r)}>
                                    <X className="h-3.5 w-3.5" /> Reject
                                </Button>
                            </>
                        )}
                    </div>
                </div>
            ))}

            <Modal open={!!rejecting} onClose={() => setRejecting(null)} title="Reject request">
                <div className="space-y-4">
                    <div>
                        <Label htmlFor="reason">Reason (optional)</Label>
                        <Textarea
                            id="reason"
                            rows={3}
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            placeholder="Let the tenant know why..."
                        />
                    </div>
                    <Button
                        variant="danger"
                        className="w-full"
                        loading={update.isPending}
                        onClick={() => {
                            if (!rejecting) return;
                            update.mutate(
                                { id: rejecting.id, status: "REJECTED", rejectReason: reason || undefined },
                                { onSuccess: () => setRejecting(null) }
                            );
                            setReason("");
                        }}
                    >
                        Confirm rejection
                    </Button>
                </div>
            </Modal>
        </div>
    );
}