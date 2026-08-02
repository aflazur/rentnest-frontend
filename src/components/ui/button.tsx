import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import type { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "ghost" | "danger" | "outline";
type Size = "sm" | "md" | "lg";

const variantClasses: Record<Variant, string> = {
    primary:
        "bg-pine text-paper hover:bg-pine-light disabled:bg-pine/50",
    secondary:
        "bg-gold text-ink hover:bg-gold-light disabled:bg-gold/50",
    outline:
        "border border-line bg-transparent text-ink hover:border-pine hover:text-pine",
    ghost: "bg-transparent text-ink hover:bg-paper-dim",
    danger: "bg-red text-paper hover:bg-red/85 disabled:bg-red/50",
};

const sizeClasses: Record<Size, string> = {
    sm: "text-sm px-3 py-1.5",
    md: "text-sm px-4 py-2.5",
    lg: "text-base px-6 py-3",
};

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: Variant;
    size?: Size;
    loading?: boolean;
};

export function Button({
    variant = "primary",
    size = "md",
    loading,
    className,
    children,
    disabled,
    ...props
}: ButtonProps) {
    return (
        <button
            className={cn(
                "inline-flex items-center justify-center gap-2 rounded-sm font-medium tracking-wide transition-colors duration-150 disabled:cursor-not-allowed",
                variantClasses[variant],
                sizeClasses[size],
                className
            )}
            disabled={disabled || loading}
            {...props}
        >
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
            {children}
        </button>
    );
}

export function LinkButton({
    href,
    variant = "primary",
    size = "md",
    className,
    children,
    ...props
}: {
    href: string;
    variant?: Variant;
    size?: Size;
    className?: string;
    children: React.ReactNode;
} & Omit<React.ComponentProps<typeof Link>, "href" | "className" | "children">) {
    return (
        <Link
            href={href}
            className={cn(
                "inline-flex items-center justify-center gap-2 rounded-sm font-medium tracking-wide transition-colors duration-150",
                variantClasses[variant],
                sizeClasses[size],
                className
            )}
            {...props}
        >
            {children}
        </Link>
    );
}
