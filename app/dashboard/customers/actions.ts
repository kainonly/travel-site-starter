'use server';

import { Customer, Prisma } from '@prisma/client';

import { db } from '@/lib/bootstrap';

export async function create(data: Customer) {
  data.balance = new Prisma.Decimal(data.balance);
  return db.customer.create({ data });
}

export async function del(id: number) {
  return db.customer.delete({ where: { id } });
}

export async function bulkDel(ids: number[]) {
  return db.customer.deleteMany({ where: { id: { in: ids } } });
}
