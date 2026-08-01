"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Star } from "lucide-react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Textarea, Label, FieldError } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { reviewSchema, type ReviewValues } from "@/lib/schemas/rental";
import { useCreateReview } from "@/hooks/use-reviews";

export function LeaveReviewModal({
    rentalRequestId,
    trigger,
}: {
    rentalRequestId: string;
    trigger: (open: () => void) => React.ReactNode;
}) {
    const [open, setOpen] = useState(false);
    const create = useCreateReview();

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        reset,
        formState: { errors },
    } = useForm<ReviewValues>({
        resolver: zodResolver(reviewSchema),
        defaultValues: { rating: 5 },
    });

    const rating = watch("rating");

    async function onSubmit(values: ReviewValues) {
        await create.mutateAsync({ rentalRequestId, ...values });
        reset();
        setOpen(false);
    }

    return (
        <>
            {trigger(() => setOpen(true))}
            <Modal open={open} onClose={() => setOpen(false)} title="Leave a review">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
                    <div>
                        <Label>Rating</Label>
                        <div className="flex gap-1">
                            {[1, 2, 3, 4, 5].map((n) => (
                                <button
                                    key={n}
                                    type="button"
                                    onClick={() => setValue("rating", n, { shouldValidate: true })}
                                    aria-label={`${n} stars`}
                                >
                                    <Star
                                        className={cn(
                                            "h-6 w-6 transition-colors",
                                            n <= rating ? "fill-gold text-gold" : "text-line"
                                        )}
                                    />
                                </button>
                            ))}
                        </div>
                        <FieldError message={errors.rating?.message} />
                    </div>
                    <div>
                        <Label htmlFor="comment">Comment</Label>
                        <Textarea
                            id="comment"
                            rows={3}
                            placeholder="How was your stay?"
                            {...register("comment")}
                        />
                        <FieldError message={errors.comment?.message} />
                    </div>
                    <Button type="submit" className="w-full" loading={create.isPending}>
                        Submit review
                    </Button>
                </form>
            </Modal>
        </>
    );
}