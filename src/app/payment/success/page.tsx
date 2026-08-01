import { Suspense } from "react";
import { Loader2 } from "lucide-react";
import { PaymentSuccess } from "@/components/dashboard/payment-success";

export default function PaymentSuccessPage() {
    return (
        <Suspense
            fallback={
                <div className="mx-auto flex min-h-[50vh] max-w-md items-center justify-center">
                    <Loader2 className="h-8 w-8 animate-spin text-pine" />
                </div>
            }
        >
            <PaymentSuccess />
        </Suspense>
    );
}