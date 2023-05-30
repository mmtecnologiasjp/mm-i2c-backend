import { PrismaClient, PrivateConversation } from '@prisma/client';
import { userUuids } from './Users';
import { OmitTimestamps } from '..';
const prisma = new PrismaClient();

export const privateConversationUuids = [
  '52b63e72-2276-4e1b-a582-58d2c7001663',
  '31c7b86d-8f5f-4f77-9e8e-6605b9e9e5de',
  '1aa774fd-3d59-4b0a-b1e0-8e0e10e2f363',
  '0f26b5c9-6c8b-4e1d-b208-4808e162f6b9',
  'a64f40db-0ce9-4e5a-9e13-4a6c97d3c1b5',
  '9584a1cd-3d94-4e61-a7b7-ae8e12d8d098',
];

export class PrivateConversationsSeeds {
  static async execute() {
    const privateConversations = [] as OmitTimestamps<PrivateConversation>[];

    for (let i = 0; i < privateConversationUuids.length; i++) {
      privateConversations.push({
        uuid: privateConversationUuids[i],
        from_uuid: userUuids[i],
        to_uuid: userUuids[i + 1],
      });
    }

    await prisma.privateConversation.createMany({ data: privateConversations });
    console.log(
      `Created ${privateConversationUuids.length} Private Conversations`,
    );
  }
}
