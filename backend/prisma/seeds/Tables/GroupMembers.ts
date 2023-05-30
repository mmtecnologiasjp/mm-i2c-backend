import { Group, GroupMember, PrismaClient, RoleEnum } from '@prisma/client';
import { OmitTimestamps } from '..';
import { groupsUuid } from './Groups';
import { userUuids } from './Users';
const prisma = new PrismaClient();

const groupMembersUuid = [
  '3aaf14d5-3e06-4c8e-b682-9fb623c63897',
  '2953e954-12be-4f3e-9e26-43b2db4960a7',
  '1f5a4227-894f-4a46-af60-7a2d1b07e8a1',
  '0e240168-8939-4a37-8c3a-5e6f03b982a7',
];

export class GroupMembersSeeds {
  static async execute() {
    const groupMembers = [] as OmitTimestamps<GroupMember>[];

    for (let i = 0; i < groupMembersUuid.length; i++) {
      groupMembers.push({
        uuid: groupMembersUuid[i],
        group_uuid: groupsUuid[i],
        role: 'Admin',
        user_uuid: userUuids[i],
      });
    }

    await prisma.groupMember.createMany({ data: groupMembers });

    console.log(`Created ${groupMembersUuid.length} Group Members`);

    // for (let i = 0; i < 2; i++) {
    //   const role = i === 0 ? RoleEnum.Admin : RoleEnum.Member;

    //   const groupMember = await prisma.groupMember.create({
    //     data: {
    //       group_uuid: `01`,
    //       user_uuid: `0${i + 1}`,
    //       role,
    //     },
    //   });
    //   console.log(`Created groupMember with id: ${groupMember.uuid}`);
    // }
  }
}
