'use client';
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { sobaSchema } from "@/app/validation/sobeSchema";
import { useRouter } from "next/navigation";


type RoomData = { id?: string; broj: string; tip: string; kapacitet: number; cena: number };


interface RoomFormProps {
    action: (formData: FormData) => Promise<void>;
    initialData?: Partial<RoomData>;
    mode?: 'add' | 'edit';
    lang?: string; // dodaj ovo
}

export default function RoomForm({ action, initialData, mode, lang }: RoomFormProps) {


    const { t } = useTranslation("sobe");
    const router = useRouter();
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
        const result = sobaSchema.safeParse(parsedData);
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
        const result = sobaSchema.safeParse(parsedData);
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
        <form onSubmit={handleSubmit} className="mb-8 flex gap-4 flex-col max-w-md mt-4 w-full">
            <input type="hidden" name="lang" value={lang || 'sr'} />
            <input type="hidden" name="id" value={initialData?.id ?? ''} />
            <Input
                name="broj"
                placeholder={t("number_pl")}
                required
                value={broj}
                onChange={e => setBroj(e.target.value)}
                onBlur={e => validateField("broj", e.target.value)}
                className="w-full"
            />
            {fieldErrors.broj && <div className="text-red-500 text-xs pl-1">{fieldErrors.broj}</div>}
            <Input
                name="tip"
                placeholder={t("type_pl")}
                required
                value={tip}
                onChange={e => setTip(e.target.value)}
                onBlur={e => validateField("tip", e.target.value)}
                className="w-full"
            />
            {fieldErrors.tip && <div className="text-red-500 text-xs pl-1">{fieldErrors.tip}</div>}
            <Input
                name="kapacitet"
                placeholder={t("capacity_pl")}
                type="number"
                required
                value={kapacitet}
                onChange={e => setKapacitet(e.target.value)}
                onBlur={e => validateField("kapacitet", e.target.value)}
                className="w-full"
            />
            {fieldErrors.kapacitet && <div className="text-red-500 text-xs pl-1">{fieldErrors.kapacitet}</div>}
            <Input
                name="cena"
                placeholder={t("price_pl")}
                type="number"
                required
                value={cena}
                onChange={e => setCena(e.target.value)}
                onBlur={e => validateField("cena", e.target.value)}
                className="w-full"
            />
            {fieldErrors.cena && <div className="text-red-500 text-xs pl-1">{fieldErrors.cena}</div>}
            {error && <div className="text-red-500 text-xs pl-1">{error}</div>}
            <div className="flex flex-col sm:flex-row sm:gap-x-0 gap-y-3 mt-8 pt-6 border-t">
                <Button
                    type="button"
                    variant="secondary"
                    className="flex-1 py-2 text-base text-gray-600 hover:text-blue-900 "
                    onClick={() => router.push(`/sobe?lang=${lang}`)}
                >
                    {t("back")}
                </Button>
                <Button type="submit" variant="default" className="flex-1 py-2 text-base ">
                    {mode === 'edit' ? t("edit") : t("add")}
                </Button>

            </div>

        </form>
    );
}