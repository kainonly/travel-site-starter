import { hash } from '@node-rs/argon2';

import { db } from '@/lib/bootstrap';

export async function GET(request: Request) {
  const result = await db.user.create({
    data: {
      email: 'work@kainonly.com',
      password: await hash('pass@VAN1234')
    }
  });
  return Response.json({ message: result });
}
