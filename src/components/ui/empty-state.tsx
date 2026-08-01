import type { LucideIcon } from "lucide-react";

export function EmptyState({
    icon: Icon,
    title,
    description,
    action,
}: {
    icon: LucideIcon;
    title: string;
    description?: string;
    action?: React.ReactNode;
}) {
    return (
        <div className="flex flex-col items-center gap-3 rounded-md border border-dashed border-line px-6 py-16 text-center">
            <Icon className="h-8 w-8 text-ink/30" strokeWidth={1.5} />
            <p className="font-display text-lg text-ink">{title}</p>
            {description && <p className="max-w-sm text-sm text-ink/60">{description}</p>}
            {action}
        </div>
    );
}