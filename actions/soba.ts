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
export async function dodajSobu(formData: FormData) {
  const broj = formData.get('broj') as string;
  const tip = formData.get('tip') as string;
  const kapacitet = Number(formData.get('kapacitet'));
  const cena = Number(formData.get('cena'));
  const lang = (formData.get('lang') as string) || 'mn';

  try {
    await prisma.soba.create({
      data: { broj, tip, kapacitet, cena },
    });
  } catch (error: any) {
    revalidatePath('/sobe');
    const params = new URLSearchParams();
    if (error.code === 'P2002') {
      params.append('error', 'exists');
    } else {
      params.append('error', 'error');
    }
    redirect(`/sobe?${params.toString()}`);
    return;
  }
  revalidatePath('/sobe');
  const params = new URLSearchParams();
  params.append('success', 'added');
  redirect(`/sobe?${params.toString()}`);

}

export async function obrisiSobu(formData: FormData) {
  const id = Number(formData.get('id'));
  const lang = (formData.get('lang') as string) || 'mn';
  try {
    const soba = await prisma.soba.findUnique({ where: { id } });
    if (!soba) {
      throw new Error('notfound');
    }
    await prisma.soba.delete({ where: { id } });
  } catch (error: any) {
    revalidatePath('/sobe');
    const params = new URLSearchParams();
    params.append('error', 'error');
    redirect(`/sobe?${params.toString()}`);
    return;
  }
  revalidatePath('/sobe');
  const params = new URLSearchParams();
  params.append('success', 'deleted');
  redirect(`/sobe?${params.toString()}`);
}

export const azurirajSobu = async (formData: FormData) => {
  "use server";
  const id = Number(formData.get('id'));

  const broj = formData.get('broj') as string | null;
  const tip = formData.get('tip') as string | null;
  const kapacitet = formData.get('kapacitet') ? Number(formData.get('kapacitet')) : null;
  const cena = formData.get('cena') ? Number(formData.get('cena')) : null;
  const lang = (formData.get('lang') as string) || 'mn';

  // Priprema objekta za ažuriranje
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
  } catch (error: any) {
    revalidatePath('/sobe');
    const params = new URLSearchParams();
    if (error.code === 'P2002') {
      params.append('error', 'exists');
    } else {
      params.append('error', 'error');
    }
    redirect(`/sobe?${params.toString()}`);
    return;
  }
  if (tip === null) {
    revalidatePath('/sobe');
    const params = new URLSearchParams();
    params.append('error', 'error'); // ili poseban ključ za "Izaberite Tip Sobe"
    redirect(`/sobe?${params.toString()}`);
    return;
  } else if (tip.toString().length < 2) {
    revalidatePath('/sobe');
    const params = new URLSearchParams();
    params.append('error', 'error'); // ili poseban ključ za "Mora biti više od 2 karaktera"
    redirect(`/sobe?${params.toString()}`);
    return;
  }
  revalidatePath('/sobe');
  const params = new URLSearchParams();
  params.append('success', 'updated');
  redirect(`/sobe?${params.toString()}`);

};