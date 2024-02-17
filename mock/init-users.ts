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
      job_descrptior: faker.person.jobDescriptor(),
      job_area: faker.person.jobArea(),
      bio: faker.person.bio()
    });
  }

  await db.user.createMany({
    data
  });
})();
