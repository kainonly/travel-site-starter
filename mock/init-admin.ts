import { hash } from '@node-rs/argon2';
import { PrismaClient } from '@prisma/client';

const db = new PrismaClient();

(async () => {
  await db.admin.create({
    data: {
      email: 'work@kainonly.com',
      password: await hash('pass@VAN1234')
    }
  });
})();
