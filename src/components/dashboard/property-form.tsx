"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import type { z } from "zod";
import { propertySchema, type PropertyValues } from "@/lib/schemas/rental";
import { Input, Textarea, Select, Label, FieldError } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCategories } from "@/hooks/use-categories";
import { useCreateProperty, useUpdateProperty } from "@/hooks/use-landlord-properties";
import type { Property } from "@/types";

const TYPES = ["APARTMENT", "HOUSE", "STUDIO", "CONDO", "ROOM"];

type PropertyFormInput = z.input<typeof propertySchema>;

export function PropertyForm({ property }: { property?: Property }) {
    const router = useRouter();
    const { data: categories } = useCategories();
    const create = useCreateProperty();
    const update = useUpdateProperty();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<PropertyFormInput, unknown, PropertyValues>({
        resolver: zodResolver(propertySchema),
        defaultValues: property
            ? {
                title: property.title,
                description: property.description,
                price: property.price,
                type: property.type,
                address: property.address,
                city: property.city,
                area: property.area,
                bedrooms: property.bedrooms,
                bathrooms: property.bathrooms,
                sizeSqft: property.sizeSqft,
                amenities: property.amenities?.join(", "),
                images: property.images?.join(", "),
                categoryId: property.categoryId,
            }
            : undefined,
    });

    async function onSubmit(values: PropertyValues) {
        const payload = {
            ...values,
            amenities: values.amenities
                ? values.amenities.split(",").map((a) => a.trim()).filter(Boolean)
                : [],
            images: values.images
                ? values.images.split(",").map((a) => a.trim()).filter(Boolean)
                : [],
        };

        if (property) {
            await update.mutateAsync({ id: property.id, payload });
        } else {
            await create.mutateAsync(payload);
        }
        router.push("/dashboard/landlord");
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
            <div>
                <Label htmlFor="title">Title</Label>
                <Input id="title" placeholder="Spacious 3-Bed House in Uttara" {...register("title")} />
                <FieldError message={errors.title?.message} />
            </div>

            <div>
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" rows={4} {...register("description")} />
                <FieldError message={errors.description?.message} />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <Label htmlFor="price">Price / month</Label>
                    <Input id="price" type="number" {...register("price")} />
                    <FieldError message={errors.price?.message} />
                </div>
                <div>
                    <Label htmlFor="type">Type</Label>
                    <Select id="type" {...register("type")}>
                        {TYPES.map((t) => (
                            <option key={t} value={t}>
                                {t.charAt(0) + t.slice(1).toLowerCase()}
                            </option>
                        ))}
                    </Select>
                    <FieldError message={errors.type?.message} />
                </div>
            </div>

            <div>
                <Label htmlFor="categoryId">Category</Label>
                <Select id="categoryId" {...register("categoryId")} defaultValue="">
                    <option value="" disabled>
                        Select a category
                    </option>
                    {categories?.map((c) => (
                        <option key={c.id} value={c.id}>
                            {c.name}
                        </option>
                    ))}
                </Select>
                <FieldError message={errors.categoryId?.message} />
                {categories && categories.length === 0 && (
                    <p className="mt-1 text-xs text-ink/50">
                        No categories exist yet — ask an admin to create one before listing a property.
                    </p>
                )}
            </div>

            <div>
                <Label htmlFor="address">Address</Label>
                <Input id="address" placeholder="Sector 10, Uttara" {...register("address")} />
                <FieldError message={errors.address?.message} />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <Label htmlFor="city">City</Label>
                    <Input id="city" placeholder="Dhaka" {...register("city")} />
                    <FieldError message={errors.city?.message} />
                </div>
                <div>
                    <Label htmlFor="area">Area</Label>
                    <Input id="area" placeholder="Uttara" {...register("area")} />
                    <FieldError message={errors.area?.message} />
                </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
                <div>
                    <Label htmlFor="bedrooms">Bedrooms</Label>
                    <Input id="bedrooms" type="number" {...register("bedrooms")} />
                    <FieldError message={errors.bedrooms?.message} />
                </div>
                <div>
                    <Label htmlFor="bathrooms">Bathrooms</Label>
                    <Input id="bathrooms" type="number" {...register("bathrooms")} />
                    <FieldError message={errors.bathrooms?.message} />
                </div>
                <div>
                    <Label htmlFor="sizeSqft">Size (sqft)</Label>
                    <Input id="sizeSqft" type="number" {...register("sizeSqft")} />
                    <FieldError message={errors.sizeSqft?.message} />
                </div>
            </div>

            <div>
                <Label htmlFor="amenities">Amenities (comma separated)</Label>
                <Input id="amenities" placeholder="Garage, Garden, Security" {...register("amenities")} />
            </div>

            <div>
                <Label htmlFor="images">Image URLs (comma separated)</Label>
                <Input
                    id="images"
                    placeholder="https://images.example.com/photo1.jpg"
                    {...register("images")}
                />
            </div>

            <Button type="submit" loading={isSubmitting || create.isPending || update.isPending}>
                {property ? "Save changes" : "Create listing"}
            </Button>
        </form>
    );
}
