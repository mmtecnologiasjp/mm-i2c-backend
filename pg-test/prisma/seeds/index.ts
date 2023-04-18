import { GroupMembersSeeds } from './Tables/GroupMembers';
import { GroupsSeeds } from './Tables/Groups';
import { MessagesSeeds } from './Tables/Messages';
import { PrivateConversationsSeeds } from './Tables/PrivateConversation';
import { UsersSeeds } from './Tables/Users';

async function main() {
  await UsersSeeds.execute();
  await PrivateConversationsSeeds.execute();
  await GroupsSeeds.execute();
  await GroupMembersSeeds.execute();
  await MessagesSeeds.execute();
  // await PrivateConversationMembersSeeds.execute();
  // await TasksSeeds.execute();
  // await TaskAssigneesSeeds.execute();
  // await ContentsSeeds.execute();
}

main();
