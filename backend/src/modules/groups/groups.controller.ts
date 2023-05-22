import { Controller, Get, Post, Body, Patch, Param, Put } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { Group } from './entities/group.entity';
import {
  ApiCreate,
  ApiEndpoints,
  ApiGetAll,
  ApiGetOne,
  ApiSoftDelete,
  ApiUpdate,
} from 'src/shared/utils/swagger/endpoints-decorators';
import { SoftDeletedGroup } from './swagger/groups.custom-schemas';
import { GroupMessages } from './swagger/schemas/group-messages';

@ApiEndpoints({
  tag: 'Groups',
  schemas: [Group, SoftDeletedGroup, GroupMessages],
})
@Controller('groups')
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @Post()
  @ApiCreate({ Schema: Group })
  create(@Body() createGroupDto: CreateGroupDto) {
    return this.groupsService.create(createGroupDto);
  }

  @Get()
  @ApiGetAll({ Schema: Group })
  findAll() {
    return this.groupsService.findAll();
  }

  @Get(':uuid')
  @ApiGetOne({ Schema: GroupMessages })
  findOne(@Param('uuid') uuid: string) {
    return this.groupsService.findOne(uuid);
  }

  @Patch(':uuid')
  @ApiUpdate({ Schema: Group })
  update(@Param('uuid') uuid: string, @Body() updateGroupDto: UpdateGroupDto) {
    return this.groupsService.update(uuid, updateGroupDto);
  }

  @Put(':uuid')
  @ApiSoftDelete({ SoftDeletedSchema: SoftDeletedGroup })
  softDelete(@Param('uuid') uuid: string) {
    return this.groupsService.softDelete(uuid);
  }
}
