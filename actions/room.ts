"use server";
import prisma from '@/lib/prisma';


export const createRoom = async (formData: FormData) => {
  const number = formData.get('number') as string;
  const type = formData.get('type') as string;
  const capacity = Number(formData.get('capacity'));
  const price = Number(formData.get('price'));

  try {
    await prisma.room.create({
      data: {
        number,
        type,
        capacity,
        price,
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to create room: ${error.message}`);
    } else {
      throw new Error('Failed to create room: Unknown error');
    }
  } finally {
    await prisma.$disconnect();
  }
};

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
};


export const readRoomId = async (roomId: number) => {
  try {
    const room = await prisma.room.findUnique({
      where: { id: roomId },
    });
    return room;
  } catch (error) {
    console.error("Error reading room:", error);
    return null;
  } finally {
    await prisma.$disconnect();
  }
};

export const updateRoom = async (id: number, number: string, type: string, capacity: number, price: number, formData: FormData): Promise<{ number?: string; type?: string; capacity?: number; price?: number; } | null> => {
  try {
    const id = Number(formData.get('id'));
    const number = formData.get('number') as string | null;
    const type = formData.get('type') as string | null;
    const capacity = formData.get('capacity') ? Number(formData.get('capacity')) : null;
    const price = formData.get('price') ? Number(formData.get('price')) : null;

    if (!id) {
      throw new Error('Room id is required for update.');
    }

    const updatedDetails: { number?: string; type?: string; capacity?: number; price?: number } = {};
    if (number !== null) updatedDetails.number = number;
    if (type !== null) updatedDetails.type = type;
    if (capacity !== null) updatedDetails.capacity = capacity;
    if (price !== null) updatedDetails.price = price;

    const updatedRoom = await prisma.room.update({
      where: { id },
      data: updatedDetails,
    });
    return updatedRoom;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Unable to update room: ${error.message}`);
    } else {
      throw new Error('Unable to update room: Unknown error');
    }
  } finally {
    await prisma.$disconnect();
  }
};


export const deleteRoom = async (roomId: number): Promise<string> => {
  const room = await prisma.room.findUnique({
    where: { id: roomId },
  });

  if (!room) {
    throw new Error('Room not found');
  }

  await prisma.room.delete({
    where: { id: roomId },
  });

  return 'Room deleted successfully';
};