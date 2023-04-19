import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import prisma from '../client';

@Injectable()
export class UsersService {
  create(createUserDto: CreateUserDto) {
    return prisma.users.create({
      data: createUserDto,
    });
  }

  findAll() {
    return prisma.users.findMany();
  }

  findOne(uuid: string) {
    return prisma.users.findUnique({ where: { uuid } });
  }

  update(uuid: string, updateUserDto: UpdateUserDto) {
    return prisma.users.update({ where: { uuid }, data: updateUserDto });
  }

  softDelete(uuid: string) {
    return prisma.users.update({
      where: { uuid },
      data: {
        deleted_at: new Date(),
      },
    });
  }
}
