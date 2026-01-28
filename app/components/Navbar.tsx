"use client";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem
} from "@/components/ui/dropdown-menu";
import { useTranslation } from "react-i18next"; // koristi hook, ne direktan import i18n

export default function Navbar() {
  const { data: session } = useSession();
  const router = useRouter();
  const { i18n } = useTranslation(); // koristi hook

  const handleSignIn = () => router.push("/auth/signin");
  const handleSignOut = () => signOut({ callbackUrl: "/auth/signin" });

  return (
    <nav className="w-full bg-white shadow px-6 py-4 flex justify-between items-start">
      <div className="flex flex-col items-start gap-1">
        <Link href="/" className="text-xl font-bold">M-HOTEL Admin</Link>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">Sobe</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem asChild>
              <Link href="/rooms">Sobe</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
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
        <Button
          onClick={() => i18n.changeLanguage("en")}
          className={i18n.language === "en" ? "font-bold underline" : ""}
        >
          EN
        </Button>
        <Button
          onClick={() => i18n.changeLanguage("sr")}
          className={i18n.language === "sr" ? "font-bold underline" : ""}
        >
          SR
        </Button>
      </div>
    </nav>
  );
}