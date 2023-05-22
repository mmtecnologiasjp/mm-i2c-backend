import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { GroupsModule } from './modules/groups/groups.module';
import { GroupMembersModule } from './modules/group-members/group-members.module';
import { PrivateConversationsModule } from './modules/private-conversations/private-conversations.module';
import { TasksModule } from './modules/tasks/tasks.module';

@Module({
  imports: [
    UsersModule,
    GroupsModule,
    PrivateConversationsModule,
    GroupMembersModule,
    TasksModule,
  ],
})
export class AppModule {}
