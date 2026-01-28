'use client';
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { roomSchema } from "@/app/validation/roomsSchema";


type RoomData = { id?: string; broj: string; tip: string; kapacitet: number; cena: number };

interface RoomFormProps {
    action: (formData: FormData) => Promise<void>;
    initialData?: Partial<RoomData>;
    mode?: 'add' | 'edit';
}

export default function RoomForm({ action, initialData, mode }: RoomFormProps) {
    const { t } = useTranslation("sobe");
    const [broj, setBroj] = useState(initialData?.broj ?? "");
    const [tip, setTip] = useState(initialData?.tip ?? "");
    const [kapacitet, setKapacitet] = useState(initialData?.kapacitet?.toString() ?? "");
    const [cena, setCena] = useState(initialData?.cena?.toString() ?? "");
    const [fieldErrors, setFieldErrors] = useState<{ broj?: string; tip?: string; kapacitet?: string; cena?: string }>({});
    const [error, setError] = useState("");

    type RoomField = "broj" | "tip" | "kapacitet" | "cena";
    const validateField = (field: RoomField, value: string) => {
        const data = {
            broj,
            tip,
            kapacitet,
            cena,
            [field]: value
        };
        const parsedData = {
            ...data,
            kapacitet: Number(data.kapacitet),
            cena: Number(data.cena)
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
            broj,
            tip,
            kapacitet: Number(kapacitet),
            cena: Number(cena)
        };
        const result = roomSchema.safeParse(parsedData);
        if (!result.success) {
            const errors = result.error.flatten().fieldErrors;
            setFieldErrors({
                broj: errors.broj?.[0],
                tip: errors.tip?.[0],
                kapacitet: errors.kapacitet?.[0],
                cena: errors.cena?.[0],
            });
            return;
        }
        const formData = new FormData();
        formData.append("broj", broj);
        formData.append("tip", tip);
        formData.append("kapacitet", kapacitet);
        formData.append("cena", cena);
        if (initialData?.id) formData.append("id", initialData.id);

        await action(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="mb-8 flex gap-4 flex-col max-w-md mt-4">
            <input type="hidden" name="id" value={initialData?.id ?? ''} />
            <Input
                name="broj"
                placeholder={t("broj")}
                required
                value={broj}
                onChange={e => setBroj(e.target.value)}
                onBlur={e => validateField("broj", e.target.value)}
            />
            {fieldErrors.broj && <div className="text-red-500">{fieldErrors.broj}</div>}
            <Input
                name="tip"
                placeholder={t("tip")}
                required
                value={tip}
                onChange={e => setTip(e.target.value)}
                onBlur={e => validateField("tip", e.target.value)}
            />
            {fieldErrors.tip && <div className="text-red-500">{fieldErrors.tip}</div>}
            <Input
                name="kapacitet"
                placeholder={t("kapacitet")}
                type="number"
                required
                value={kapacitet}
                onChange={e => setKapacitet(e.target.value)}
                onBlur={e => validateField("kapacitet", e.target.value)}
            />
            {fieldErrors.kapacitet && <div className="text-red-500">{fieldErrors.kapacitet}</div>}
            <Input
                name="cena"
                placeholder={t("cena")}
                type="number"
                required
                value={cena}
                onChange={e => setCena(e.target.value)}
                onBlur={e => validateField("cena", e.target.value)}
            />
            {fieldErrors.cena && <div className="text-red-500">{fieldErrors.cena}</div>}
            {error && <div className="text-red-500">{error}</div>}
            <Button type="submit" variant="default">
                {mode === 'edit' ? t("edit") : t("add")}
            </Button>
        </form>
    );
}