'use server';

import { verify } from '@node-rs/argon2';
import CryptoJS from 'crypto-js';
import { cookies } from 'next/headers';

import clientPromise from '@/lib/mongodb';
import { Admin } from '@/model/admin';

export type BasicData = {
  email: string;
  password: string;
};

export async function basicSubmit(data: BasicData): Promise<boolean> {
  const client = await clientPromise;
  const db = client.db('development');
  const user = await db.collection<Admin>('admin').findOne({
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
