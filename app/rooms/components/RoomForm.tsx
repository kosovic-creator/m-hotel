'use client';
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { roomSchema } from "@/app/validation/roomsSchema";


type RoomData = { id?: string; number: string; type: string; capacity: number; price: number };

interface RoomFormProps {
    action: (formData: FormData) => Promise<void>;
    initialData?: Partial<RoomData>;
    mode?: 'add' | 'edit';
}

export default function RoomForm({ action, initialData, mode }: RoomFormProps) {
    const { t } = useTranslation("rooms");
    const [number, setNumber] = useState(initialData?.number ?? "");
    const [type, setType] = useState(initialData?.type ?? "");
    const [capacity, setCapacity] = useState(initialData?.capacity?.toString() ?? "");
    const [price, setPrice] = useState(initialData?.price?.toString() ?? "");
    const [fieldErrors, setFieldErrors] = useState<{ number?: string; type?: string; capacity?: string; price?: string }>({});
    const [error, setError] = useState("");

    type RoomField = "number" | "type" | "capacity" | "price";
    const validateField = (field: RoomField, value: string) => {
        const data = {
            number,
            type,
            capacity,
            price,
            [field]: value
        };
        const parsedData = {
            ...data,
            capacity: Number(data.capacity),
            price: Number(data.price)
        };
        const result = roomSchema.safeParse(parsedData);
        if (!result.success) {
            const errors = result.error.flatten().fieldErrors;
            setFieldErrors(prev => ({ ...prev, [field]: errors[field]?.[0] }));
        } else {
            setFieldErrors(prev => ({ ...prev, [field]: undefined }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        const parsedData = {
            number,
            type,
            capacity: Number(capacity),
            price: Number(price)
        };
        const result = roomSchema.safeParse(parsedData);
        if (!result.success) {
            const errors = result.error.flatten().fieldErrors;
            setFieldErrors({
                number: errors.number?.[0],
                type: errors.type?.[0],
                capacity: errors.capacity?.[0],
                price: errors.price?.[0],
            });
            return;
        }
        const formData = new FormData();
        formData.append("number", number);
        formData.append("type", type);
        formData.append("capacity", capacity);
        formData.append("price", price);
        if (initialData?.id) formData.append("id", initialData.id);

        await action(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="mb-8 flex gap-4 flex-col max-w-md mt-4">
            <input type="hidden" name="id" value={initialData?.id ?? ''} />
            <Input
                name="number"
                placeholder={t("number")}
                required
                value={number}
                onChange={e => setNumber(e.target.value)}
                onBlur={e => validateField("number", e.target.value)}
            />
            {fieldErrors.number && <div className="text-red-500">{fieldErrors.number}</div>}
            <Input
                name="type"
                placeholder={t("type")}
                required
                value={type}
                onChange={e => setType(e.target.value)}
                onBlur={e => validateField("type", e.target.value)}
            />
            {fieldErrors.type && <div className="text-red-500">{fieldErrors.type}</div>}
            <Input
                name="capacity"
                placeholder={t("capacity")}
                type="number"
                required
                value={capacity}
                onChange={e => setCapacity(e.target.value)}
                onBlur={e => validateField("capacity", e.target.value)}
            />
            {fieldErrors.capacity && <div className="text-red-500">{fieldErrors.capacity}</div>}
            <Input
                name="price"
                placeholder={t("price")}
                type="number"
                required
                value={price}
                onChange={e => setPrice(e.target.value)}
                onBlur={e => validateField("price", e.target.value)}
            />
            {fieldErrors.price && <div className="text-red-500">{fieldErrors.price}</div>}
            {error && <div className="text-red-500">{error}</div>}
            <Button type="submit" variant="default">
                {mode === 'edit' ? t("edit") : t("add")}
            </Button>
        </form>
    );
}