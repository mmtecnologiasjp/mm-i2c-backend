import { GroupMembersSeeds } from './Tables/GroupMembers';
import { GroupsSeeds } from './Tables/Groups';
import { MessagesSeeds } from './Tables/Messages';
import { PrivateConversationsSeeds } from './Tables/PrivateConversation';
import { PrivateConversationMembersSeeds } from './Tables/PrivateConversationsMembers';
import { UsersSeeds } from './Tables/Users';

async function main() {
  await UsersSeeds.execute();
  await GroupsSeeds.execute();
  await GroupMembersSeeds.execute();
  await PrivateConversationsSeeds.execute();
  await PrivateConversationMembersSeeds.execute();
  await MessagesSeeds.execute();
}

main();
