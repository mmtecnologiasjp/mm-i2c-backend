import { User } from '@prisma/client';
import prisma from '../../../src/client';
import { faker } from '@faker-js/faker';
import { OmitTimestamps } from '..';

export const userUuids = [
  'f47ac10b-58cc-4372-a567-0e02b2c3d479',
  'e6310bc6-8e6c-4fc0-b320-73cfb4c40e60',
  'd57aebc5-8c29-44b0-a64e-0c2f1736b82b',
  'c45de99e-d437-4ebc-a714-ae0e80b3c9a1',
  'b34a6e9b-1070-4c62-94ca-1a68d947da6d',
  'a23cd78e-3a01-43c7-b0d1-21e9f5676a2f',
  '9190b69f-68cd-4c8d-9716-27d6d48b2c7d',
  '8253a4d1-7a9b-4c11-843f-3dcd5c3a52e7',
  '7302670c-3f07-4dd2-b023-4e7e010249ff',
  '6269dd84-8e92-4f47-8a0d-9a5b6c3b2458',
];

export class UsersSeeds {
  static async execute() {
    const users = [] as OmitTimestamps<User>[];

    for (let i = 0; i < userUuids.length; i++) {
      users.push({
        uuid: userUuids[i],
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
      });
    }

    await prisma.user.createMany({ data: users });
    console.log(`Created ${userUuids.length} Users`);
  }
}
