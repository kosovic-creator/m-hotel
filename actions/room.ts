/* eslint-disable @typescript-eslint/no-unused-vars */
"use server";
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';


export async function createRoom(formData: FormData) {
  const number = formData.get('number') as string;
  const type = formData.get('type') as string;
  const capacity = Number(formData.get('capacity'));
  const price = Number(formData.get('price'));
  try {
    await prisma.room.create({
      data: { number, type, capacity, price },
    });
    revalidatePath('/rooms');
    const params = new URLSearchParams();
    params.append('success', 'Soba je dodata');
    redirect(`/rooms?${params.toString()}`);
  } catch (error) {
    revalidatePath('/rooms');
    const params = new URLSearchParams();
    params.append('error', 'Soba nije dodata');
    redirect(`/rooms?${params.toString()}`);
  } finally {
    await prisma.$disconnect();
  }
}
export async function deleteRoom(formData: FormData) {
  const id = Number(formData.get('id'));
  try {
    const room = await prisma.room.findUnique({ where: { id } });
    if (!room) {
      throw new Error('Soba nije pronađena');
    }
    await prisma.room.delete({ where: { id } });
    revalidatePath('/rooms');
    const params = new URLSearchParams();
    params.append('success', 'Soba je obrisana');
    redirect(`/rooms?${params.toString()}`);
  } catch (error) {
    revalidatePath('/rooms');
    const params = new URLSearchParams();
    params.append('error', 'Soba nije obrisana');
    redirect(`/rooms?${params.toString()}`);
  } finally {
    await prisma.$disconnect();
  }
}

export const readRoom = async () => {
  try {
    const room = await prisma.room.findMany();
    return room;
  } catch (error) {
    console.error("Error reading room:", error);
    return null;
  } finally {
    await prisma.$disconnect();
  }
}

export const readRoomId = async (searchParams: { roomId: number }) => {
  try {
    const room = await prisma.room.findUnique({
      where: { id: searchParams.roomId },
    });
    return room;
  } catch (error) {
    console.error("Error reading room:", error);
    return null;
  } finally {
    await prisma.$disconnect();
  }
};

export const updateRoom = async (formData: FormData) => {
  "use server";
  const id = Number(formData.get('id'));
  const number = formData.get('number') as string | null;
  const type = formData.get('type') as string | null;
  const capacity = formData.get('capacity') ? Number(formData.get('capacity')) : null;
  const price = formData.get('price') ? Number(formData.get('price')) : null;

  if (!id) {
    const params = new URLSearchParams();
    params.append('error', 'Room id is required for update.');
    redirect(`/rooms?${params.toString()}`);
  }

  const updatedDetails: { number?: string; type?: string; capacity?: number; price?: number } = {};
  if (number !== null) updatedDetails.number = number;
  if (type !== null) updatedDetails.type = type;
  if (capacity !== null) updatedDetails.capacity = capacity;
  if (price !== null) updatedDetails.price = price;

  try {
    await prisma.room.update({
      where: { id },
      data: updatedDetails,
    });
    revalidatePath('/rooms');
    const params = new URLSearchParams();
    params.append('success', 'Soba je ažurirana');
    redirect(`/rooms?${params.toString()}`);
  // } catch (error) {
  //   revalidatePath('/rooms');
  //   const params = new URLSearchParams();
  //   params.append('error', 'Soba nije uspješno ažurirana');
  //   redirect(`/rooms?${params.toString()}`);
  } finally {
    await prisma.$disconnect();
  }
};