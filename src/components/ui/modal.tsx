"use client";

import { useEffect } from "react";
import { X } from "lucide-react";

export function Modal({
    open,
    onClose,
    title,
    children,
}: {
    open: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}) {
    useEffect(() => {
        function onKey(e: KeyboardEvent) {
            if (e.key === "Escape") onClose();
        }
        if (open) document.addEventListener("keydown", onKey);
        return () => document.removeEventListener("keydown", onKey);
    }, [open, onClose]);

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
                className="absolute inset-0 bg-ink/40 backdrop-blur-[2px]"
                onClick={onClose}
                aria-hidden
            />
            <div
                role="dialog"
                aria-modal="true"
                aria-label={title}
                className="relative w-full max-w-md rounded-md border border-line bg-paper p-6 shadow-xl"
            >
                <div className="mb-4 flex items-center justify-between">
                    <h2 className="font-display text-xl text-ink">{title}</h2>
                    <button
                        onClick={onClose}
                        aria-label="Close"
                        className="rounded-sm p-1 text-ink/50 hover:bg-paper-dim hover:text-ink"
                    >
                        <X className="h-4 w-4" />
                    </button>
                </div>
                {children}
            </div>
        </div>
    );
}