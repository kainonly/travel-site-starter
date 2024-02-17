import { faker } from '@faker-js/faker';
import { PrismaClient, User } from '@prisma/client';

const db = new PrismaClient();

(async () => {
  const data: User[] = [];
  for (let i = 0; i < 10000; i++) {
    const gender = faker.person.sexType();
    data.push(<User>{
      first_name: faker.person.firstName(gender),
      last_name: faker.person.lastName(gender),
      gender,
      job_title: faker.person.jobTitle(),
      job_type: faker.person.jobType(),
      bio: faker.person.bio()
    });
  }

  await db.user.createMany({
    data
  });
})();
