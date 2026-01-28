"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { loginSchema } from "@/app/validation/authSchemas";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<{ email?: string; password?: string }>({});
  const router = useRouter();

  const validateField = (field: "email" | "password", value: string) => {
    const result = loginSchema.safeParse({ email, password, [field]: value });
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
    const result = loginSchema.safeParse({ email, password });
    if (!result.success) {
      const errors = result.error.flatten().fieldErrors;
      setFieldErrors({
        email: errors.email?.[0],
        password: errors.password?.[0],
      });
      return;
    }
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    if (res?.error) setError(res.error);
    else router.push("/");
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Sign In</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          onBlur={e => validateField("email", e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
        {fieldErrors.email && <div className="text-red-500">{fieldErrors.email}</div>}
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          onBlur={e => validateField("password", e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
        {fieldErrors.password && <div className="text-red-500">{fieldErrors.password}</div>}
        {error && <div className="text-red-500">{error}</div>}
        <Button type="submit" variant="default" size="default">Sign In</Button>
      </form>
    </div>
  );
}
