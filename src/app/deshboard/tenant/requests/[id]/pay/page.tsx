import { PayRedirect } from "@/components/dashboard/pay-redirect";

export default async function PayPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    return <PayRedirect rentalRequestId={id} />;
}