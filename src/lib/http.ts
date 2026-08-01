"use client";

import { API_BASE_URL, ACCESS_TOKEN_COOKIE } from "@/lib/config";
import { getClientCookie } from "@/lib/cookies-client";
import type { ApiErrorDetail, ApiResponse } from "@/types";

export class ApiError extends Error {
    status: number;
    errorDetails?: ApiErrorDetail[];

    constructor(message: string, status: number, errorDetails?: ApiErrorDetail[]) {
        super(message);
        this.name = "ApiError";
        this.status = status;
        this.errorDetails = errorDetails;
    }
}

type RequestOptions = Omit<RequestInit, "body"> & {
    body?: unknown;
    auth?: boolean;
};

/** Client-side fetch wrapper for the RentNest backend API.
 *  Attaches the JWT access token (read from a client-readable cookie set by
 *  our own /api/auth/* route handlers) and normalizes error responses into
 *  the { success, message, errorDetails } shape the backend guarantees. */
export async function apiFetch<T>(path: string, options: RequestOptions = {}): Promise<T> {
    const { body, auth = true, headers, ...rest } = options;

    const finalHeaders: Record<string, string> = {
        "Content-Type": "application/json",
        ...(headers as Record<string, string>),
    };

    if (auth) {
        const token = getClientCookie(ACCESS_TOKEN_COOKIE);
        if (token) finalHeaders.Authorization = `Bearer ${token}`;
    }

    const res = await fetch(`${API_BASE_URL}${path}`, {
        ...rest,
        headers: finalHeaders,
        body: body !== undefined ? JSON.stringify(body) : undefined,
    });

    let json: ApiResponse<T> | null = null;
    try {
        json = await res.json();
    } catch {
        // no JSON body
    }

    if (!res.ok || !json?.success) {
        throw new ApiError(
            json?.message ?? `Request failed with status ${res.status}`,
            res.status,
            json?.errorDetails
        );
    }

    return json.data;
}

export function apiFetchWithMeta<T>(
    path: string,
    options: RequestOptions = {}
): Promise<ApiResponse<T>> {
    const { body, auth = true, headers, ...rest } = options;
    const finalHeaders: Record<string, string> = {
        "Content-Type": "application/json",
        ...(headers as Record<string, string>),
    };
    if (auth) {
        const token = getClientCookie(ACCESS_TOKEN_COOKIE);
        if (token) finalHeaders.Authorization = `Bearer ${token}`;
    }
    return fetch(`${API_BASE_URL}${path}`, {
        ...rest,
        headers: finalHeaders,
        body: body !== undefined ? JSON.stringify(body) : undefined,
    }).then(async (res) => {
        const json = (await res.json()) as ApiResponse<T>;
        if (!res.ok || !json.success) {
            throw new ApiError(json.message, res.status, json.errorDetails);
        }
        return json;
    });
}