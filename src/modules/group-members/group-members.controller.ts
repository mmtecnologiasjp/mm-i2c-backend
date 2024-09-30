import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Put,
  UseGuards,
} from '@nestjs/common';
import { GroupMembersService } from './group-members.service';
import { CreateGroupMemberDto } from './dto/create-group-member.dto';
import { UpdateGroupMemberDto } from './dto/update-group-member.dto';
import {
  ApiCreate,
  ApiEndpoints,
  ApiGetAll,
  ApiGetOne,
  ApiSoftDelete,
  ApiUpdate,
} from 'src/shared/utils/swagger/endpoints-decorators';
import { GroupMember } from './entities/group-member.entity';
import { SoftDeletedGroupMember } from './swagger/group-members.custom-schemas';
import { AuthGuard } from '../auth/guard/auth.guard';

@ApiEndpoints({
  tag: 'GroupMembers',
  schemas: [GroupMember, SoftDeletedGroupMember],
})
@Controller('group-members')
export class GroupMembersController {
  constructor(private readonly groupMembersService: GroupMembersService) {}

  @Post()
  @ApiCreate({ Schema: GroupMember })
  @UseGuards(AuthGuard)
  create(@Body() createGroupMemberDto: CreateGroupMemberDto) {
    return this.groupMembersService.create(createGroupMemberDto);
  }

  @Get(':uuid')
  @ApiGetOne({ Schema: GroupMember })
  @UseGuards(AuthGuard)
  findOne(@Param('uuid') uuid: string) {
    return this.groupMembersService.findOne(uuid);
  }

  @Patch(':uuid')
  @ApiUpdate({ Schema: GroupMember })
  @UseGuards(AuthGuard)
  update(
    @Param('uuid') uuid: string,
    @Body() updateGroupMemberDto: UpdateGroupMemberDto,
  ) {
    return this.groupMembersService.update(uuid, updateGroupMemberDto);
  }

  @Put(':uuid')
  @ApiSoftDelete({ SoftDeletedSchema: SoftDeletedGroupMember })
  @UseGuards(AuthGuard)
  softDelete(@Param('uuid') uuid: string) {
    return this.groupMembersService.softDelete(uuid);
  }

  @Get('/group/:groupUUID')
  @ApiGetAll({ Schema: GroupMember })
  @UseGuards(AuthGuard)
  findGroupMembersByGroupUUID(@Param('groupUUID') groupUUID: string) {
    return this.groupMembersService.findGroupMembersByGroupUUID(groupUUID);
  }
}
