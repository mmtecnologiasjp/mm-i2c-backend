import { faker } from '@faker-js/faker';

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export class UsersSeeds {
  static async execute() {
    for (let i = 0; i < 10; i++) {
      const user = await prisma.user.create({
        data: {
          uuid: `0${i + 1}`,
          first_name: faker.name.firstName(),
          last_name: faker.name.lastName(),
          username: faker.internet.userName(),
          email: faker.internet.email(),
          status: faker.helpers.arrayElement([
            'Active',
            'Inactive',
            'Banned',
            'Quarantine',
          ]),
          password: faker.internet.password(),
          avatar_url: faker.internet.avatar(),
        },
      });
      console.log(`Created user with id: ${user.uuid}`);
    }
  }
}
