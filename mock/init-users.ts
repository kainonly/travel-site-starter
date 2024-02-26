import { hash } from '@node-rs/argon2';
import { PrismaClient } from '@prisma/client';

const db = new PrismaClient();

(async () => {
  await db.user.createMany({
    data: [
      {
        email: 'work@kainonly.com',
        password: await hash('pass@VAN1234')
      },
      {
        email: 'op@kainonly.com',
        password: await hash('pass@VAN1234')
      },
      {
        email: 'admin@kainonly.com',
        password: await hash('pass@VAN1234')
      },
      {
        email: 'test@kainonly.com',
        password: await hash('pass@VAN1234')
      }
    ]
  });
})();
