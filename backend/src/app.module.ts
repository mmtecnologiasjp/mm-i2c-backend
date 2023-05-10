import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { GroupsModule } from './groups/groups.module';
import { GroupMembersModule } from './group-members/group-members.module';

@Module({
  imports: [UsersModule, GroupsModule, GroupMembersModule],
})
export class AppModule {}
