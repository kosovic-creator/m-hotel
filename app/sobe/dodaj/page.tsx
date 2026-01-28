'use server';
import React from 'react';
import Link from 'next/link';
import { dodajSobu } from '@/actions/soba';
import { getLocaleMessages } from '@/i18n/i18n';
import SobaForm from '../components/SobaForm';

export default async function AddRoomPage({ searchParams }: { searchParams: Promise<{ lang?: string }> }) {
  const params = await searchParams;
  const lang: "en" | "sr" = params?.lang === "sr" ? "sr" : "en";
  const t = getLocaleMessages(lang, 'sobe');
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="w-full max-w-md">
        <Link className="text-grey-600 hover:text-blue-900" href={`/sobe?lang=${lang}`}>
          {t.back}
        </Link>
        <h1 className="text-2xl font-bold mb-4">{t.add}</h1>
        <SobaForm action={dodajSobu} mode="add" />
      </div>
    </div>
  );
}