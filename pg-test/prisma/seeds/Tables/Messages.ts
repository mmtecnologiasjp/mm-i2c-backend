import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

//sql query to find all messages from a group
// SELECT * FROM messages WHERE group_uuid = '01';

export class MessagesSeeds {
  static async execute() {
    for (let i = 0; i < 2; i++) {
      const message = await prisma.messages.create({
        data: {
          uuid: `0${i + 1}`,
          content: faker.lorem.paragraph(12),
          group_uuid: '01',
          owner_uuid: `0${i + 1}`,
          private_conversation_uuid: null,
          deleted_at: null,
          created_at: new Date(),
          updated_at: new Date(),
        },
      });
      console.log(`Created message with id: ${message.uuid}`);
    }

    for (let i = 0; i < 5; i++) {
      const privateMessage = await prisma.messages.create({
        data: {
          content: faker.lorem.paragraph(12),
          private_conversation_uuid: '02',
          owner_uuid: faker.helpers.shuffle(['01', '02'])[0],
        },
      });

      console.log(`Created private message with id: ${privateMessage.uuid}`);
    }
  }
}
