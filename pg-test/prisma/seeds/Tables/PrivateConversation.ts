import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export class PrivateConversationsSeeds {
  static async execute() {
    for (let i = 0; i < 2; i++) {
      const privateConversation = await prisma.privateConversations.create({
        data: {
          uuid: `0${i + 1}`,
          created_at: new Date(),
          updated_at: new Date(),
        },
      });
      console.log(
        `Created private conversation with id: ${privateConversation.uuid}`,
      );
    }
  }
}
