import prisma from '../../../../lib/prisma';
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';



export async function POST(request: Request) {
  const { email, password, name, role } = await request.json();
  if (!email || !password || !role) {
    return NextResponse.json({ error: 'Email, password, and role required' }, { status: 400 });
  }
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    return NextResponse.json({ error: 'User already exists' }, { status: 409 });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: { email, name, password: hashedPassword, role },
  });
  return NextResponse.json({ id: user.id, email: user.email, name: user.name, role: user.role });
}
