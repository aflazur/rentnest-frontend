import { cn } from "@/lib/utils";

export function Skeleton({ className }: { className?: string }) {
    return <div className={cn("animate-pulse rounded-sm bg-paper-dim", className)} />;
}

export function PropertyCardSkeleton() {
    return (
        <div className="overflow-hidden rounded-md border border-line">
            <Skeleton className="h-44 w-full rounded-none" />
            <div className="space-y-2 p-4">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
                <Skeleton className="h-3 w-1/3" />
            </div>
        </div>
    );
}