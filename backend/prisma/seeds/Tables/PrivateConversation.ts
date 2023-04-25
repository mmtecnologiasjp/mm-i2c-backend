import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export class PrivateConversationsSeeds {
  static async execute() {
    for (let i = 0; i < 4; i++) {
      const privateConversation = await prisma.privateConversation.create({
        data: {
          uuid: `0${i + 1}`,
          from_uuid: `0${i + 1}`,
          to_uuid: `0${i + 2}`,
        },
      });
      console.log(
        `Created private conversation with id: ${privateConversation.uuid}`,
      );
    }
  }
}
