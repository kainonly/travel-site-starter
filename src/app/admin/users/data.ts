'use server';

import { db } from '@/lib/bootstrap';

export async function getData() {
  return db.user.findMany({
    select: {
      id: true,
      created_at: true,
      updated_at: true,
      status: true,
      email: true,
      name: true,
      avatar: true,
      phone: true
    }
  });
}
