/* eslint-disable @typescript-eslint/no-unused-vars */
"use server";
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export const ucitajSobe = async () => {
  try {
    const soba = await prisma.soba.findMany();
    return soba;
  } catch (error) {
    console.error("Greška pri učitavanju soba:", error);
    return null;
  } finally {
    await prisma.$disconnect();
  }
}

export async function dodajSobu(formData: FormData) {
  const broj = formData.get('broj') as string;
  const tip = formData.get('tip') as string;
  const kapacitet = Number(formData.get('kapacitet'));
  const cena = Number(formData.get('cena'));
  try {
    await prisma.soba.create({
      data: { broj, tip, kapacitet, cena },
    });
    revalidatePath('/sobe');
    const params = new URLSearchParams();
    params.append('success', 'Soba je dodata');
    redirect(`/sobe?${params.toString()}`);
  } catch (error) {
    revalidatePath('/sobe');
    const params = new URLSearchParams();
    params.append('error', 'Soba nije dodata');
    redirect(`/sobe?${params.toString()}`);
  } finally {
    await prisma.$disconnect();
  }
}


export async function obrisiSobu(formData: FormData) {
  const id = Number(formData.get('id'));
  try {
    const soba = await prisma.soba.findUnique({ where: { id } });
    if (!soba) {
      throw new Error('Soba nije pronađena');
    }
    await prisma.soba.delete({ where: { id } });
    revalidatePath('/sobe');
    const params = new URLSearchParams();
    params.append('success', 'Soba je obrisana');
    redirect(`/sobe?${params.toString()}`);
  } catch (error) {
    revalidatePath('/sobe');
    const params = new URLSearchParams();
    params.append('error', 'Soba nije obrisana');
    redirect(`/sobe?${params.toString()}`);
  } finally {
    await prisma.$disconnect();
  }
}



export const ucitajSobuId = async (searchParams: { sobaId: number }) => {
  try {
    const soba = await prisma.soba.findUnique({
      where: { id: searchParams.sobaId },
    });
    return soba;
  } catch (error) {
    console.error("Greška pri učitavanju sobe:", error);
    return null;
  } finally {
    await prisma.$disconnect();
  }
};

export const azurirajSobu = async (formData: FormData) => {
  "use server";
  const id = Number(formData.get('id'));
  const broj = formData.get('broj') as string | null;
  const tip = formData.get('tip') as string | null;
  const kapacitet = formData.get('kapacitet') ? Number(formData.get('kapacitet')) : null;
  const cena = formData.get('cena') ? Number(formData.get('cena')) : null;

  if (!id) {
    const params = new URLSearchParams();
    params.append('error', 'ID sobe je obavezan za ažuriranje.');
    redirect(`/sobe?${params.toString()}`);
  }

  const updatedDetails: { broj?: string; tip?: string; kapacitet?: number; cena?: number } = {};
  if (broj !== null) updatedDetails.broj = broj;
  if (tip !== null) updatedDetails.tip = tip;
  if (kapacitet !== null) updatedDetails.kapacitet = kapacitet;
  if (cena !== null) updatedDetails.cena = cena;
  try {
    await prisma.soba.update({
      where: { id },
      data: updatedDetails,
    });

  if (tip === null) {
    revalidatePath('/sobe');
    const params = new URLSearchParams();
    params.append('error', 'Izaberite Tip Sobe');
    redirect(`/sobe?${params.toString()}`);
  } else if (tip.toString().length > 5) {
    revalidatePath('/sobe');
    const params = new URLSearchParams();
    params.append('error', 'Mora bitimannje od 5 karaktera');
    redirect(`/sobe?${params.toString()}`);
  }
  revalidatePath('/sobe');
  const params = new URLSearchParams();
  params.append('success', 'Zapis je ažuriran');
  redirect(`/sobe?${params.toString()}`);

  } finally {
    await prisma.$disconnect();
  }
};