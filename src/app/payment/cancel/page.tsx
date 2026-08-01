import { Suspense } from "react";
import { PaymentCancel } from "@/components/dashboard/payment-cancel";

export default function PaymentCancelPage() {
    return (
        <Suspense>
            <PaymentCancel />
        </Suspense>
    );
}