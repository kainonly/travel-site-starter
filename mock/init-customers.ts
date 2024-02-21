import { faker } from '@faker-js/faker';
import { Customer, Prisma, PrismaClient } from '@prisma/client';

const db = new PrismaClient();

(async () => {
  const data: Customer[] = [];
  for (let i = 0; i < 10000; i++) {
    const gender = faker.person.sexType();
    data.push(<Customer>{
      first_name: faker.person.firstName(gender),
      last_name: faker.person.lastName(gender),
      email: faker.internet.email(),
      phone: faker.phone.number(),
      gender,
      balance: new Prisma.Decimal(faker.finance.amount())
    });
  }

  await db.customer.createMany({
    data
  });
})();
