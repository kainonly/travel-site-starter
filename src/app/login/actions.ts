'use server';

import { verify } from '@node-rs/argon2';
import CryptoJS from 'crypto-js';
import { cookies } from 'next/headers';

import getInstance from '@/lib/instance';
import { User } from '@/model/user';

export type BasicDto = {
  email: string;
  password: string;
};

export async function basicSubmit(data: BasicDto): Promise<boolean> {
  const { db } = await getInstance();
  const user = await db.collection<User>('admin').findOne({
    email: data.email
  });
  const check = await verify(user!.password, data.password);
  if (check) {
    const ciphertext = CryptoJS.AES.encrypt(
      JSON.stringify({ email: data.email }),
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

export async function smsSubmit(data: SmsDto): Promise<boolean> {
  return false;
}
