"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
// Make sure you are importing the React Button component, not a style function.
// If "@/components/ui/button" exports a named or default React component, import it accordingly.
// For example, if it is a default export:
import { Button } from "@/components/ui/button";
// Or, if it is a named export and the file exports a React component named "Button":
// import { Button } from "@/components/ui/button";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, name, role }),
    });
    if (res.ok) router.push("/auth/signin");
    else {
      const data = await res.json();
      setError(data.error || "Registration failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      <form onSubmit={handleSubmit} className="space-y-4">

        <Input
          type="text"
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
        <Input
          type="text"
          placeholder="Role"
          value={role}
          onChange={e => setRole(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
        {error && <div className="text-red-500">{error}</div>}
        <Button type="submit" variant="default" size="default">Register</Button>
      </form>
    </div>
  );
}
