import { cn } from "@/lib/utils";

export function Card({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={cn("rounded-md border border-line bg-white/60 p-5", className)}
            {...props}
        />
    );
}