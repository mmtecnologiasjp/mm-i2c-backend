import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export class GroupMembersSeeds {
  static async execute() {
    for (let i = 0; i < 2; i++) {
      const groupMember = await prisma.groupMembers.create({
        data: {
          group_id: `01`,
          user_uuid: `0${i + 1}`,
        },
      });
      console.log(`Created groupMember with id: ${groupMember.uuid}`);
    }
  }
}
