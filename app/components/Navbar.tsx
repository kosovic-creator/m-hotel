"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { useState } from "react";


export default function Navbar() {
  const { data: session } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { t, i18n } = useTranslation("navbar");
  const [menuOpen, setMenuOpen] = useState(false);

  const handleChangeLanguage = (lng: "en" | "sr") => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("lang", lng);
    router.push(`${pathname}?${params.toString()}`);
    i18n.changeLanguage(lng);
    setMenuOpen(false);
  };

  const handleprijava = () => {
    setMenuOpen(false);
    router.push(`/auth/prijava?lang=${i18n.language}`);
  };
  const handleSignOut = () => {
    setMenuOpen(false);
    signOut({ callbackUrl: `/auth/prijava?lang=${i18n.language}` });
  };

  return (
    <nav className="w-full bg-white shadow px-4 py-3 flex justify-between items-center md:px-6 md:py-4 relative z-20">
      {/* Logo & desktop nav */}
      <div className="flex flex-col items-start gap-1">
        <Link href={`/?lang=${i18n.language}`} className="text-xl font-bold">
          <span className="font-bold text-sm sm:text-base truncate ">
            <span className="text-black">⭕️ </span>
            <span className="text-black">{'M-HOTEL Admin'.slice(0, 7)}</span>
            <span className="text-red-600">{'M-HOTEL Admin'.slice(7)}</span>
          </span>
        </Link>
        <div className="hidden sm:block">
          <Button variant="ghost" size="sm" asChild>
            <Link href={`/sobe?lang=${i18n.language}`}>{t("rooms")}</Link>
          </Button>
        </div>
      </div>

      {/* Hamburger icon for mobile */}
      <button
        className="sm:hidden flex flex-col justify-center items-center w-10 h-10 rounded focus:outline-none focus:ring-2 focus:ring-primary"
        onClick={() => setMenuOpen((v) => !v)}
        aria-label="Open menu"
      >
        <span className="block w-6 h-0.5 bg-black mb-1"></span>
        <span className="block w-6 h-0.5 bg-black mb-1"></span>
        <span className="block w-6 h-0.5 bg-black"></span>
      </button>

      {/* Desktop nav */}
      <div className="hidden sm:flex items-center gap-4">
        {session?.user ? (
          <>
            <span className="text-gray-700">{session.user.name || session.user.email}</span>
            <Button variant="outline" onClick={handleSignOut}>
              {t("logout")}
            </Button>
          </>
        ) : (
          <Button variant="default" onClick={handleprijava}>
            {t("login")}
          </Button>
        )}
        <Button
          onClick={() => handleChangeLanguage("en")}
          className={i18n.language === "en" ? "font-bold underline" : ""}
        >
          EN
        </Button>
        <Button
          onClick={() => handleChangeLanguage("sr")}
          className={i18n.language === "sr" ? "font-bold underline" : ""}
        >
          SR
        </Button>
      </div>

      {/* Mobile nav dropdown */}
      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-md flex flex-col items-start px-4 py-3 gap-2 sm:hidden animate-fade-in z-30">
          <Button variant="ghost" size="sm" asChild onClick={() => setMenuOpen(false)}>
            <Link href={`/sobe?lang=${i18n.language}`}>{t("rooms")}</Link>
          </Button>
          {session?.user ? (
            <>
              <span className="text-gray-700 mb-2">{session.user.name || session.user.email}</span>
              <Button variant="outline" onClick={handleSignOut} className="w-full">
                {t("logout")}
              </Button>
            </>
          ) : (
            <Button variant="default" onClick={handleprijava} className="w-full">
              {t("login")}
            </Button>
          )}
          <div className="flex gap-2 mt-2">
            <Button
              onClick={() => handleChangeLanguage("en")}
              className={i18n.language === "en" ? "font-bold underline" : ""}
            >
              EN
            </Button>
            <Button
              onClick={() => handleChangeLanguage("sr")}
              className={i18n.language === "sr" ? "font-bold underline" : ""}
            >
              SR
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}