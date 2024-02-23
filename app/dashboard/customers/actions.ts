'use server';

import { Prisma } from '@prisma/client';

import { CustomerDto } from '@/app/dashboard/customers/customer';
import { db } from '@/lib/bootstrap';

export async function create(data: CustomerDto) {
  await db.customer.create({
    data: {
      ...data,
      balance: new Prisma.Decimal(data.balance)
    }
  });
}

export async function update(id: number, data: CustomerDto) {
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
