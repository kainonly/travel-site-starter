'use server';

import { Customer, Prisma } from '@prisma/client';

import { db } from '@/lib/bootstrap';

export async function create(data: Customer) {
  await db.customer.create({
    data: {
      ...data,
      balance: new Prisma.Decimal(data.balance)
    }
  });
}

export async function update(id: number, data: Customer) {
  await db.customer.update({
    where: { id },
    data: {
      ...data,
      balance: new Prisma.Decimal(data.balance)
    }
  });
}

export async function del(id: number) {
  return db.customer.delete({ where: { id } });
}

export async function bulkDel(ids: number[]) {
  return db.customer.deleteMany({ where: { id: { in: ids } } });
}
