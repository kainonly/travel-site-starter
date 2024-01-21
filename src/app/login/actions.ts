'use server';

import clientPromise from '@/lib/mongodb';

export type BasicData = {
  email?: string;
  password?: string;
};

export async function basicSubmit(data: BasicData) {
  const client = await clientPromise;
  const db = client.db('development');
  const user = await db.collection('admin').findOne();
  return user;
}
