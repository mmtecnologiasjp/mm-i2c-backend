import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export class PrivateConversationMembersSeeds {
  static async execute() {
    for (let i = 0; i < 2; i++) {
      const privateConversationMember =
        await prisma.privateConversationMembers.create({
          data: {
            uuid: `0${i + 1}`,
            conversation_uuid: '02',
            user_uuid: `0${i + 1}`,
          },
        });
      console.log(
        `Created private conversation member with id: ${privateConversationMember.uuid}`,
      );
    }
  }
}
