'use server';

import { db } from '@/lib/bootstrap';

export async function del(id: number) {
  return db.customer.delete({ where: { id } });
}

export async function bulkDel(ids: number[]) {
  return db.customer.deleteMany({ where: { id: { in: ids } } });
}
