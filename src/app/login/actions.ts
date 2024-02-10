'use server';

import { verify } from '@node-rs/argon2';
import { signSync } from '@node-rs/jsonwebtoken';
import { User } from '@prisma/client';
import { cookies } from 'next/headers';

import { db } from '@/lib/bootstrap';

export type BasicDto = {
  email: string;
  password: string;
};

export async function basicSubmit(dto: BasicDto): Promise<boolean> {
  const data: User = await db.user.findFirst({
    where: {
      email: dto.email,
      status: true
    }
  });
  if (!data) {
    return false;
  }
  const check = await verify(data.password, dto.password);
  if (check) {
    const token = signSync({ data: { id: data.id } }, process.env.KEY as string);
    cookies().set('access_token', token, {
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7,
      sameSite: 'strict'
    });
  }
  return check;
}

export type SmsDto = {
  area: string;
  phone: string;
  captcha: string;
};

export async function smsSubmit(dto: SmsDto): Promise<boolean> {
  return false;
}
