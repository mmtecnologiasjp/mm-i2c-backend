import { Controller, Get, Post, Body, Patch, Param, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ApiCreate,
  ApiEndpoints,
  ApiGetAll,
  ApiGetOne,
  ApiSoftDelete,
  ApiUpdate,
} from 'src/shared/utils/swagger/endpoints-decorators';
import { User } from './entities/user.entity';
import { SoftDeletedUser } from './swagger/users.custom-schemas';
import { EmailParam } from 'src/shared/utils/class-validator/validators/EmailParam';
import { ApiParam } from '@nestjs/swagger';

@ApiEndpoints({ tag: 'Users', schemas: [User, SoftDeletedUser] })
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiCreate({ Schema: User })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiGetAll({ Schema: User })
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':uuid')
  @ApiGetOne({ Schema: User })
  findOne(@Param('uuid') uuid: string) {
    return this.usersService.findOne(uuid);
  }

  @Get('/email/:email')
  @ApiGetOne({ Schema: User })
  @ApiParam({
    name: 'email',
    required: true,
    type: 'string',
  })
  findOneByEmail(@Param() params: EmailParam) {
    return this.usersService.findOneByEmail(params.email);
  }

  @Patch(':uuid')
  @ApiUpdate({ Schema: User })
  update(@Param('uuid') uuid: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(uuid, updateUserDto);
  }

  @Put(':uuid')
  @ApiSoftDelete({ SoftDeletedSchema: SoftDeletedUser })
  softDelete(@Param('uuid') uuid: string) {
    return this.usersService.softDelete(uuid);
  }
}
