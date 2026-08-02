import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return (
        <div className="mx-auto max-w-5xl px-5 py-10">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="mt-3 h-9 w-64" />
            <div className="mt-8 space-y-3">
                {Array.from({ length: 4 }).map((_, i) => (
                    <Skeleton key={i} className="h-20 w-full" />
                ))}
            </div>
        </div>
    );
}