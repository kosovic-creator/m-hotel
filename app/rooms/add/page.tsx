'use server';
import React from 'react';
import Link from 'next/link';
import { createRoom } from '@/actions/room';
import RoomForm from '../components/RoomForm';

const translations = {
  en: {
    back: "Back to rooms",
    title: "Add Room"
  },
  sr: {
    back: "Nazad na sobe",
    title: "Dodaj sobu"
  }
};

export default async function AddRoomPage({ searchParams }: { searchParams: Promise<{ locale?: string }> }) {
  const params = await searchParams;
  const locale: "en" | "sr" = params?.locale === "sr" ? "sr" : "en";
  return (
    <div className="container mx-auto py-8">
      <Link className="text-grey-600 hover:text-blue-900" href={`/rooms?locale=${locale}`}>
        {translations[locale].back}
      </Link>
      <h1 className="text-2xl font-bold mb-4">{translations[locale].title}</h1>
      <RoomForm action={createRoom} mode="add" />
    </div>
  );
}