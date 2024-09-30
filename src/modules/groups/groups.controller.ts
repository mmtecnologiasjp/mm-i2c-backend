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
import { AuthGuard } from '../auth/guard/auth.guard';
import { SoftDeletedGroup } from './swagger/groups.custom-schemas';
import { GroupMessagesTasks } from './swagger/schemas/group-messages-tasks';

@ApiEndpoints({
  tag: 'Groups',
  schemas: [Group, SoftDeletedGroup, GroupMessagesTasks],
})
@Controller('groups')
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @Post()
  @ApiCreate({ Schema: Group })
  @UseGuards(AuthGuard)
  create(@Body() createGroupDto: CreateGroupDto) {
    return this.groupsService.create(createGroupDto);
  }

  @Get()
  @ApiGetAll({ Schema: Group })
  @UseGuards(AuthGuard)
  findAll() {
    return this.groupsService.findAll();
  }

  @Get(':uuid')
  @ApiGetOne({ Schema: GroupMessagesTasks })
  @UseGuards(AuthGuard)
  findOne(@Param('uuid') uuid: string) {
    return this.groupsService.findOne(uuid);
  }

  @Patch(':uuid')
  @ApiUpdate({ Schema: Group })
  @UseGuards(AuthGuard)
  update(@Param('uuid') uuid: string, @Body() updateGroupDto: UpdateGroupDto) {
    return this.groupsService.update(uuid, updateGroupDto);
  }

  @Put(':uuid')
  @ApiSoftDelete({ SoftDeletedSchema: SoftDeletedGroup })
  @UseGuards(AuthGuard)
  softDelete(@Param('uuid') uuid: string) {
    return this.groupsService.softDelete(uuid);
  }

  @Get('/user/:uuid')
  @ApiGetAll({ Schema: Group })
  @UseGuards(AuthGuard)
  findAllByUserUUID(@Param('uuid') uuid: string) {
    return this.groupsService.findAllByUserUUID(uuid);
  }
}
