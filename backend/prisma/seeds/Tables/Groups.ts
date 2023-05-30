import { faker } from '@faker-js/faker';
import { Group, PrismaClient } from '@prisma/client';
import { OmitTimestamps } from '..';
import { userUuids } from './Users';
const prisma = new PrismaClient();

export const groupsUuid = [
  '7b1369f0-5b1a-4fa5-91af-9f1d8b6e44f2',
  '6a8a2b0f-3bcf-482f-9250-dc117798fe2b',
  '5979b3fd-ec2d-4e1a-a693-39e7e25f6f54',
  '4b42dbd3-5463-4f97-a0dd-c69e85d99e15',
];

export class GroupsSeeds {
  static async execute() {
    const groups = [] as OmitTimestamps<Group>[];

    for (let i = 0; i < groupsUuid.length; i++) {
      groups.push({
        uuid: groupsUuid[i],
        name: faker.company.name(),
        image_url: faker.image.sports(),
        creator_uuid: userUuids[i],
        description: faker.lorem.paragraph(),
      });
    }

    await prisma.group.createMany({ data: groups });
    console.log(`Created ${groupsUuid.length} groups`);
  }
}
