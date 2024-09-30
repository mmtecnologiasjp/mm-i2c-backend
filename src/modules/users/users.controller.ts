import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
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
import { ApiParam, ApiQuery } from '@nestjs/swagger';
import { AuthGuard } from '../auth/guard/auth.guard';

@ApiEndpoints({
  tag: 'Users',
  schemas: [User, SoftDeletedUser],
})
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
  @UseGuards(AuthGuard)
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':uuid')
  @ApiGetOne({ Schema: User })
  @UseGuards(AuthGuard)
  findOne(@Param('uuid') uuid: string) {
    return this.usersService.findOne(uuid);
  }

  @Get('/search/email')
  @ApiGetOne({ Schema: User })
  @UseGuards(AuthGuard)
  @ApiQuery({
    type: 'string',
    name: 'email',
  })
  searchByEmail(@Query('searchParameter') searchParameter: string) {
    return this.usersService.searchByEmail(searchParameter);
  }

  @Patch(':uuid')
  @ApiUpdate({ Schema: User })
  @UseGuards(AuthGuard)
  update(@Param('uuid') uuid: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(uuid, updateUserDto);
  }

  @Put(':uuid')
  @ApiSoftDelete({ SoftDeletedSchema: SoftDeletedUser })
  @UseGuards(AuthGuard)
  softDelete(@Param('uuid') uuid: string) {
    return this.usersService.softDelete(uuid);
  }
}
