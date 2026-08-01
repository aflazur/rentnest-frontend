import { cn } from "@/lib/utils";
import type { RentalRequestStatus, PaymentStatus, PropertyStatus } from "@/types";

const statusStyles: Record<string, string> = {
    PENDING: "bg-gold-light/40 text-gold border-gold-light",
    APPROVED: "bg-moss/15 text-moss border-moss/40",
    REJECTED: "bg-red/10 text-red border-red/30",
    ACTIVE: "bg-pine/10 text-pine border-pine/30",
    COMPLETED: "bg-ink/5 text-ink/60 border-line",
    AVAILABLE: "bg-moss/15 text-moss border-moss/40",
    RENTED: "bg-pine/10 text-pine border-pine/30",
    UNAVAILABLE: "bg-ink/5 text-ink/50 border-line",
    FAILED: "bg-red/10 text-red border-red/30",
};

export function StatusBadge({
    status,
}: {
    status: RentalRequestStatus | PaymentStatus | PropertyStatus;
}) {
    return (
        <span
            className={cn(
                "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium tracking-wide",
                statusStyles[status] ?? "bg-ink/5 text-ink/60 border-line"
            )}
        >
            {status}
        </span>
    );
}