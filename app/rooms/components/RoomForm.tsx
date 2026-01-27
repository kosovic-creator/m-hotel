'use client';
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type RoomData = { id?: string; number: string; type: string; capacity: number; price: number };

interface RoomFormProps {
    action: (formData: FormData) => Promise<void>;
    initialData?: Partial<RoomData>;
    mode?: 'add' | 'edit';
}

export default function RoomForm({ action, initialData, mode }: RoomFormProps) {
    return (
        <form action={action} className="mb-8 flex gap-4 flex-col max-w-md mt-4">
            <input type="hidden" name="id" value={initialData?.id ?? ''} />
            <Input
                name="number"
                placeholder="Number"
                required
                defaultValue={initialData?.number}
            />
            <Input
                name="type"
                placeholder="Type"
                required
                defaultValue={initialData?.type}
            />
            <Input
                name="capacity"
                placeholder="Capacity"
                type="number"
                required
                defaultValue={initialData?.capacity}
            />
            <Input
                name="price"
                placeholder="Price"
                type="number"
                required
                defaultValue={initialData?.price}
            />
            <Button type="submit" variant="default">
                {mode === 'edit' ? 'Promijeni' : 'Dodaj'}
            </Button>
        </form>
    );
}