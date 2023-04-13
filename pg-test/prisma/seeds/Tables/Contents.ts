import { faker } from '@faker-js/faker';
import { prisma } from '../prismaSeedClient';

export class ContentsSeeds {
  static async execute() {
    for (let i = 0; i < 10; i++) {
      const content = await prisma.contents.create({
        data: {
          uuid: `0${i + 1}`,
          type: 'note',
          content: faker.lorem.sentence(),
          group_uuid: '01',
          owner_uuid: '01',
        },
      });
      console.log(`Created content with id: ${content.uuid}`);
    }
  }
}
