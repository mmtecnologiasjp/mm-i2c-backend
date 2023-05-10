import { Module } from '@nestjs/common';
import { GroupMembersModule } from './modules/group-members/group-members.module';
import { GroupsModule } from './modules/groups/groups.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [UsersModule, GroupsModule, GroupMembersModule],
})
export class AppModule {}
