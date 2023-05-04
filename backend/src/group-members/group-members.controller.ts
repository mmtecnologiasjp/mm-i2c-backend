import { Controller, Get, Post, Body, Patch, Param, Put } from '@nestjs/common';
import { GroupMembersService } from './group-members.service';
import { CreateGroupMemberDto } from './dto/create-group-member.dto';
import { UpdateGroupMemberDto } from './dto/update-group-member.dto';

@Controller('group-members')
export class GroupMembersController {
  constructor(private readonly groupMembersService: GroupMembersService) {}

  @Post()
  create(@Body() createGroupMemberDto: CreateGroupMemberDto) {
    return this.groupMembersService.create(createGroupMemberDto);
  }

  @Get(':uuid')
  findOne(@Param('uuid') uuid: string) {
    return this.groupMembersService.findOne(uuid);
  }

  @Patch(':uuid')
  update(
    @Param('uuid') uuid: string,
    @Body() updateGroupMemberDto: UpdateGroupMemberDto,
  ) {
    return this.groupMembersService.update(uuid, updateGroupMemberDto);
  }

  @Put(':uuid')
  softDelete(@Param('uuid') uuid: string) {
    return this.groupMembersService.softDelete(uuid);
  }

  @Get(':groupUUUID')
  findGroupMembersByGroupUUID(@Param('groupUUUID') groupUUUID: string) {
    return this.groupMembersService.findGroupMembersByGroupUUID(groupUUUID);
  }
}
