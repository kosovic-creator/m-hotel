"use client";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const { data: session } = useSession();
  const router = useRouter();

  const handleSignIn = () => router.push("/auth/signin");
  const handleSignOut = () => signOut({ callbackUrl: "/auth/signin" });

  return (
    <nav className="w-full bg-white shadow px-6 py-4 flex justify-between items-center">
      <div className="text-xl font-bold">M-HOTEL</div>
      <div className="flex items-center gap-4">
        {session?.user ? (
          <>
            <span className="text-gray-700">{session.user.name || session.user.email}</span>
            <Button variant="outline" onClick={handleSignOut}>
              Odjava
            </Button>
          </>
        ) : (
          <Button variant="default" onClick={handleSignIn}>
            Prijava
          </Button>
        )}
      </div>
    </nav>
  );
}