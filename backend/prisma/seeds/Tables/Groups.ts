import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export class GroupsSeeds {
  static async execute() {
    for (let i = 0; i < 2; i++) {
      const group = await prisma.group.create({
        data: {
          uuid: `0${i + 1}`,
          name: faker.company.name(),
          image_url: faker.image.sports(),
          creator_uuid: '01',
          description: faker.lorem.paragraph(),
        },
      });
      console.log(`Created group with id: ${group.uuid}`);
    }
  }
}
