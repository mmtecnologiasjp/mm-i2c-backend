import { Controller, Get, Post, Body, Patch, Param, Put } from '@nestjs/common';
import { GroupMembersService } from './group-members.service';
import { CreateGroupMemberDto } from './dto/create-group-member.dto';
import { UpdateGroupMemberDto } from './dto/update-group-member.dto';
import {
  ApiCreate,
  ApiEndpoints,
  ApiGetOne,
  ApiSoftDelete,
  ApiUpdate,
} from 'src/utils/swagger/decorators';
import { GroupMember } from './entities/group-member.entity';
import { SoftDeletedGroupMember } from './swagger/group-members.custom-schemas';

@ApiEndpoints({
  tag: 'GroupMembers',
  shemas: [GroupMember, SoftDeletedGroupMember],
})
@Controller('group-members')
export class GroupMembersController {
  constructor(private readonly groupMembersService: GroupMembersService) {}

  @Post()
  @ApiCreate({ Schema: GroupMember })
  create(@Body() createGroupMemberDto: CreateGroupMemberDto) {
    return this.groupMembersService.create(createGroupMemberDto);
  }

  @Get(':uuid')
  @ApiGetOne({ Schema: GroupMember })
  findOne(@Param('uuid') uuid: string) {
    return this.groupMembersService.findOne(uuid);
  }

  @Patch(':uuid')
  @ApiUpdate({ Schema: GroupMember })
  update(
    @Param('uuid') uuid: string,
    @Body() updateGroupMemberDto: UpdateGroupMemberDto,
  ) {
    return this.groupMembersService.update(uuid, updateGroupMemberDto);
  }

  @Put(':uuid')
  @ApiSoftDelete({ SoftDeletedSchema: SoftDeletedGroupMember })
  softDelete(@Param('uuid') uuid: string) {
    return this.groupMembersService.softDelete(uuid);
  }

  @Get(':groupUUID')
  @ApiGetOne({ Schema: GroupMember })
  findGroupMembersByGroupUUID(@Param('groupUUID') groupUUID: string) {
    return this.groupMembersService.findGroupMembersByGroupUUID(groupUUID);
  }
}
