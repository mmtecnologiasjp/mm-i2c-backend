import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { GroupsModule } from './modules/groups/groups.module';
import { GroupMembersModule } from './modules/group-members/group-members.module';
import { PrivateConversationsModule } from './modules/private-conversations/private-conversations.module';
import { MessagesModule } from './modules/messages/messages.module';

@Module({
  imports: [
    UsersModule,
    GroupsModule,
    PrivateConversationsModule,
    GroupMembersModule,
    MessagesModule,
  ],
})
export class AppModule {}
