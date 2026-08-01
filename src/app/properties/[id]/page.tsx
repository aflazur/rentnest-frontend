import { getSession } from "@/lib/session";
import { PropertyDetails } from "@/components/properties/property-details";

export default async function PropertyDetailsPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const session = await getSession();

    return <PropertyDetails id={id} session={session} />;
}