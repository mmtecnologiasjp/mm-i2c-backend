import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';
import { groupsUuid } from './Groups';
import { userUuids } from './Users';
import { privateConversationUuids } from './PrivateConversation';
const prisma = new PrismaClient();
export class MessagesSeeds {
  static async execute() {
    for (let i = 0; i < 2; i++) {
      const message = await prisma.message.create({
        data: {
          content: faker.lorem.paragraph(12),
          type: 'text',
          private_conversation_uuid: privateConversationUuids[i],
          sender_uuid: userUuids[i],
        },
      });
      console.log(`Created message with uuid: ${message.uuid}`);
    }

    for (let i = 0; i < 5; i++) {
      const privateMessage = await prisma.message.create({
        data: {
          content: faker.lorem.paragraph(12),
          group_uuid: groupsUuid[i],
          type: 'text',
          sender_uuid: userUuids[i],
        },
      });

      console.log(`Created private message with uuid: ${privateMessage.uuid}`);
    }
  }
}
