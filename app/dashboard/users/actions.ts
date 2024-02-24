'use server';

import { User } from '@prisma/client';

import { db } from '@/lib/bootstrap';

export async function create(data: User) {
  await db.user.create({
    data
  });
}

export async function update(id: number, data: User) {
  await db.user.update({
    where: { id },
    data
  });
}

export async function del(id: number) {
  return db.user.delete({ where: { id } });
}

export async function bulkDel(ids: number[]) {
  return db.user.deleteMany({ where: { id: { in: ids } } });
}
