'use server';
import React from 'react';
import Link from 'next/link';
import { createRoom } from '@/actions/room';
import RoomForm from '../components/RoomForm';

export default async function AddRoomPage() {
  return (
    <div className="container mx-auto py-8">
      <Link className="text-grey-600 hover:text-blue-900" href="/rooms">Nazad na sobe</Link>
      <h1 className="text-2xl font-bold mb-4">Add Room</h1>
      <RoomForm action={createRoom} mode="add" />
    </div>
  );
}