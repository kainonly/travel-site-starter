'use server';

import { verify } from '@node-rs/argon2';
import CryptoJS from 'crypto-js';
import { cookies } from 'next/headers';

import { db } from '@/lib/bootstrap';

export type BasicDto = {
  email: string;
  password: string;
};

export async function basicSubmit(dto: BasicDto): Promise<boolean> {
  const data = await db.user.findFirst({
    where: {
      email: dto.email
    }
  });
  const check = await verify(data!.password, dto.password);
  if (check) {
    const ciphertext = CryptoJS.AES.encrypt(
      JSON.stringify({ email: dto.email }),
      process.env.APP_KEY as string
    ).toString();
    cookies().set('session', ciphertext, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
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
