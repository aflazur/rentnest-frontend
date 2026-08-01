export type Role = "TENANT" | "LANDLORD" | "ADMIN";

export type SessionUser = {
    id: string;
    name: string;
    email: string;
    role: Role;
};

export type User = SessionUser & {
    phone?: string;
    activeStatus?: "ACTIVE" | "BLOCKED";
    createdAt?: string;
};

export type Category = {
    id: string;
    name: string;
    description?: string;
};

export type PropertyType = "APARTMENT" | "HOUSE" | "STUDIO" | "CONDO" | "ROOM";

export type PropertyStatus = "AVAILABLE" | "RENTED" | "UNAVAILABLE";

export type Property = {
    id: string;
    title: string;
    description: string;
    price: number;
    type: PropertyType;
    status: PropertyStatus;
    address: string;
    city: string;
    area: string;
    bedrooms: number;
    bathrooms: number;
    sizeSqft?: number;
    amenities: string[];
    images: string[];
    categoryId: string;
    category?: Category;
    landlordId: string;
    landlord?: { id: string; name: string; email: string; phone?: string };
    createdAt: string;
};

export type RentalRequestStatus = "PENDING" | "APPROVED" | "REJECTED" | "ACTIVE" | "COMPLETED";

export type RentalRequest = {
    id: string;
    propertyId: string;
    property?: Property;
    tenantId: string;
    tenant?: { id: string; name: string; email: string; phone?: string };
    moveInDate: string;
    message?: string;
    status: RentalRequestStatus;
    rejectReason?: string;
    payment?: Payment;
    createdAt: string;
};

export type PaymentStatus = "PENDING" | "COMPLETED" | "FAILED";

export type Payment = {
    id: string;
    transactionId: string;
    amount: number;
    provider: "STRIPE";
    status: PaymentStatus;
    paidAt?: string;
    rentalRequestId: string;
    rentalRequest?: RentalRequest;
    userId: string;
    createdAt: string;
};

export type Review = {
    id: string;
    propertyId: string;
    tenantId: string;
    tenant?: { id: string; name: string };
    rating: number;
    comment: string;
    createdAt: string;
};

export type Paginated<T> = {
    data: T[];
    meta?: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
};

export type ApiErrorDetail = {
    path?: string;
    message: string;
};

export type ApiResponse<T> = {
    success: boolean;
    message: string;
    data: T;
    meta?: { page: number; limit: number; total: number; totalPages: number };
    errorDetails?: ApiErrorDetail[];
};
