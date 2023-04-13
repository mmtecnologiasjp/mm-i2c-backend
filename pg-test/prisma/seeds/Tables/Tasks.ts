import { faker } from '@faker-js/faker';
import { prisma } from '../prismaSeedClient';

export class TasksSeeds {
  static async execute() {
    for (let i = 0; i < 10; i++) {
      const task = await prisma.tasks.create({
        data: {
          uuid: `0${i + 1}`,
          title: faker.lorem.word(),
          description: faker.lorem.sentence(),
          label: faker.lorem.word(),
          priority: 'Medium',
          sprint: 'sprint 1',
          state: 'In Progress',
          group_uuid: '01',
          owner_uuid: '01',
        },
      });
      console.log(`Created task with id: ${task.uuid}`);
    }
  }
}
