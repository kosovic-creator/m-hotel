'use server';
import React from 'react';
import Link from 'next/link';
import { createRoom } from '@/actions/room';
import RoomForm from '../components/RoomForm';
import { getLocaleMessages } from '@/i18n/i18n';

export default async function AddRoomPage({ searchParams }: { searchParams: Promise<{ lang?: string }> }) {
  const params = await searchParams;
  const lang: "en" | "sr" = params?.lang === "sr" ? "sr" : "en";
  const t = getLocaleMessages(lang, 'rooms');
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="w-full max-w-md">
        <Link className="text-grey-600 hover:text-blue-900" href={`/rooms?lang=${lang}`}>
          {t.back}
        </Link>
        <h1 className="text-2xl font-bold mb-4">{t.add}</h1>
        <RoomForm action={createRoom} mode="add" />
      </div>
    </div>
  );
}