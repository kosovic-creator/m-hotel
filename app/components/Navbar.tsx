"use client";
import { useSession, signOut } from "next-auth/react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useTranslation } from "react-i18next";

export default function Navbar() {
  const { data: session } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { t, i18n } = useTranslation("navbar");

  const handleChangeLanguage = (lng: "en" | "sr") => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("lang", lng); // koristi "lang" svuda
    router.push(`${pathname}?${params.toString()}`);
    i18n.changeLanguage(lng);
  };

  const handleprijava = () => router.push(`/auth/prijava?lang=${i18n.language}`);
  const handleSignOut = () => signOut({ callbackUrl: `/auth/prijava?lang=${i18n.language}` });

  return (
    <nav className="w-full bg-white shadow px-6 py-4 flex justify-between items-start">
      <div className="flex flex-col items-start gap-1">
        <Link href={`/?lang=${i18n.language}`} className="text-xl font-bold"><span className="font-bold text-sm sm:text-base truncate ">
                  <span className="text-black">⭕️ </span>
                  <span className="text-black">{'M-HOTEL Admin'.slice(0, 7)}</span>
                  <span className="text-red-600">{'M-HOTEL Admin'.slice(7)}</span>
                </span></Link>
        <Button variant="ghost" size="sm" asChild>
          <Link href={`/sobe?lang=${i18n.language}`}>{t("rooms")}</Link>
        </Button>
      </div>
      <div className="flex items-center gap-4">
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
    </nav>
  );
}