import { Module } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { GroupsController } from './groups.controller';
import { GroupMembersService } from '../group-members/group-members.service';

@Module({
  controllers: [GroupsController],
  providers: [GroupsService, GroupMembersService],
})
export class GroupsModule {}
