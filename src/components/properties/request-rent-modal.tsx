"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Input, Textarea, Label, FieldError } from "@/components/ui/input";
import { rentalRequestSchema, type RentalRequestValues } from "@/lib/schemas/rental";
import { useSubmitRentalRequest } from "@/hooks/use-rentals";

export function RequestRentModal({
    propertyId,
    trigger,
}: {
    propertyId: string;
    trigger: (open: () => void) => React.ReactNode;
}) {
    const [open, setOpen] = useState(false);
    const submit = useSubmitRentalRequest();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<RentalRequestValues>({ resolver: zodResolver(rentalRequestSchema) });

    async function onSubmit(values: RentalRequestValues) {
        await submit.mutateAsync({ propertyId, ...values });
        reset();
        setOpen(false);
    }

    return (
        <>
            {trigger(() => setOpen(true))}
            <Modal open={open} onClose={() => setOpen(false)} title="Request to rent">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
                    <div>
                        <Label htmlFor="moveInDate">Move-in date</Label>
                        <Input id="moveInDate" type="date" {...register("moveInDate")} />
                        <FieldError message={errors.moveInDate?.message} />
                    </div>
                    <div>
                        <Label htmlFor="message">Message to landlord (optional)</Label>
                        <Textarea
                            id="message"
                            rows={3}
                            placeholder="Tell the landlord a bit about yourself..."
                            {...register("message")}
                        />
                        <FieldError message={errors.message?.message} />
                    </div>
                    <Button type="submit" className="w-full" loading={submit.isPending}>
                        Send request
                    </Button>
                </form>
            </Modal>
        </>
    );
}