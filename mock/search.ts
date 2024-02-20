import { PrismaClient, User } from '@prisma/client';

const db = new PrismaClient();

(async () => {
  // const data = await db.user.findMany({
  //   where: { first_name: { contains: 'Wan' } }
  // });
  const data = await db.user.findMany({
    where: { job_title: { search: 'Corporate & Factors' } }
  });
  console.log(data);
})();
