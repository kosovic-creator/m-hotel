"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { registerSchema } from "@/app/validation/authSchemas";
import { useTranslation } from "react-i18next";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<{ name?: string; email?: string; password?: string }>({});
  const router = useRouter();
  const { t } = useTranslation("auth");
  const validateField = (field: "name" | "email" | "password", value: string) => {
    const result = registerSchema.safeParse({ name, email, password, [field]: value });
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
    const result = registerSchema.safeParse({ name, email, password });
    if (!result.success) {
      const errors = result.error.flatten().fieldErrors;
      setFieldErrors({
        name: errors.name?.[0],
        email: errors.email?.[0],
        password: errors.password?.[0],
      });
      return;
    }
    // ...pozovi API za registraciju...
    router.push("/auth/signin");
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">{t("register.register")}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="text"
          placeholder={t("register.name")}
          value={name}
          onChange={e => setName(e.target.value)}
          onBlur={e => validateField("name", e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
        {fieldErrors.name && <div className="text-red-500">{fieldErrors.name}</div>}
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
          placeholder={t("register.password")}
          value={password}
          onChange={e => setPassword(e.target.value)}
          onBlur={e => validateField("password", e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
        {fieldErrors.password && <div className="text-red-500">{fieldErrors.password}</div>}
        {error && <div className="text-red-500">{error}</div>}
        <Button type="submit" variant="default" size="default">{t("register.submit")}</Button>
      </form>
    </div>
  );
}
