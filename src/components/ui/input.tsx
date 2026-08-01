import { cn } from "@/lib/utils";
import { forwardRef, type InputHTMLAttributes, type TextareaHTMLAttributes, type SelectHTMLAttributes } from "react";

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
    ({ className, ...props }, ref) => (
        <input
            ref={ref}
            className={cn(
                "w-full rounded-sm border border-line bg-paper px-3 py-2.5 text-sm text-ink placeholder:text-ink/40 focus:border-pine focus:outline-none",
                className
            )}
            {...props}
        />
    )
);
Input.displayName = "Input";

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaHTMLAttributes<HTMLTextAreaElement>>(
    ({ className, ...props }, ref) => (
        <textarea
            ref={ref}
            className={cn(
                "w-full rounded-sm border border-line bg-paper px-3 py-2.5 text-sm text-ink placeholder:text-ink/40 focus:border-pine focus:outline-none",
                className
            )}
            {...props}
        />
    )
);
Textarea.displayName = "Textarea";

export const Select = forwardRef<HTMLSelectElement, SelectHTMLAttributes<HTMLSelectElement>>(
    ({ className, children, ...props }, ref) => (
        <select
            ref={ref}
            className={cn(
                "w-full rounded-sm border border-line bg-paper px-3 py-2.5 text-sm text-ink focus:border-pine focus:outline-none",
                className
            )}
            {...props}
        >
            {children}
        </select>
    )
);
Select.displayName = "Select";

export function Label({ className, ...props }: React.LabelHTMLAttributes<HTMLLabelElement>) {
    return (
        <label
            className={cn("mb-1.5 block text-xs font-medium uppercase tracking-wide text-ink/70", className)}
            {...props}
        />
    );
}

export function FieldError({ message }: { message?: string }) {
    if (!message) return null;
    return <p className="mt-1 text-xs text-red">{message}</p>;
}