import { PrismaClient, RoleEnum } from '@prisma/client';
const prisma = new PrismaClient();

export class GroupMembersSeeds {
  static async execute() {
    for (let i = 0; i < 2; i++) {
      const role = i === 0 ? RoleEnum.Admin : RoleEnum.Member;

      const groupMember = await prisma.groupMember.create({
        data: {
          group_uuid: `01`,
          user_uuid: `0${i + 1}`,
          role,
        },
      });
      console.log(`Created groupMember with id: ${groupMember.uuid}`);
    }
  }
}
