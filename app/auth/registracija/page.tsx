"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { registerSchema } from "@/app/validation/authSchemas";
import { useTranslation } from "react-i18next";

export default function RegisterPage() {
  const [ime, setIme] = useState("");
  const [email, setEmail] = useState("");
  const [lozinka, setLozinka] = useState("");
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<{ ime?: string; email?: string; lozinka?: string }>({});
  const router = useRouter();
  const { t } = useTranslation("auth");
  const validateField = (field: "ime" | "email" | "lozinka", value: string) => {
    const result = registerSchema.safeParse({ ime, email, lozinka, [field]: value });
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
    const result = registerSchema.safeParse({ ime, email, lozinka });
    if (!result.success) {
      const errors = result.error.flatten().fieldErrors;
      setFieldErrors({
        ime: errors.ime?.[0],
        email: errors.email?.[0],
        lozinka: errors.lozinka?.[0],
      });
      return;
    }
    try {
      const res = await fetch("/api/auth/registracija", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ime, email, lozinka, uloga: "admin" }), // ili druga uloga po potrebi
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Greška pri registraciji");
        return;
      }
      router.push("/auth/prijava");
    } catch (err) {
      setError("Greška na serveru");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">{t("register.register")}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="text"
          placeholder={t("register.name")}
          value={ime}
          onChange={e => setIme(e.target.value)}
          onBlur={e => validateField("ime", e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
        {fieldErrors.ime && <div className="text-red-500">{fieldErrors.ime}</div>}
        <Input
          type="email"
          placeholder={t("register.email")}
          value={email}
          onChange={e => setEmail(e.target.value)}
          onBlur={e => validateField("email", e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
        {fieldErrors.email && <div className="text-red-500">{fieldErrors.email}</div>}
        <Input
          type="password"
          placeholder={t("register.lozinka")}
          value={lozinka}
          onChange={e => setLozinka(e.target.value)}
          onBlur={e => validateField("lozinka", e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
        {fieldErrors.lozinka && <div className="text-red-500">{fieldErrors.lozinka}</div>}
        {error && <div className="text-red-500">{error}</div>}

        <div className="flex flex-col sm:flex-row sm:gap-x-0 gap-y-3 mt-8 pt-6 border-t">
          <Button type="submit" variant="default" size="default">{t("register.submit")}</Button>
          <Button
            type="button"
            variant="secondary"
            className="flex-1 py-2 text-base text-gray-600 hover:text-blue-900 rounded-t-none sm:rounded-l-none sm:rounded-br-md"
            onClick={() => router.push(`/`)}
          >
            {t("back")}
          </Button>
        </div>
      </form>
    </div>
  );
}
