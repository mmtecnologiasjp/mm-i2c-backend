import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import prisma from '../client';
import { PrismaError } from 'prisma-error-enum';
import { Prisma } from '@prisma/client';

@Injectable()
export class UsersService {
  async create(createUserDto: CreateUserDto) {
    try {
      const userCreated = await prisma.user.create({
        data: createUserDto,
      });

      return userCreated;
    } catch (error) {
      const prismaError = error as Prisma.PrismaClientKnownRequestError;

      if (prismaError.code === PrismaError.UniqueConstraintViolation) {
        throw new ConflictException('Email already exists');
      }
    }
  }

  findAll() {
    return prisma.user.findMany();
  }

  async findOne(uuid: string) {
    const user = await this._getUser(uuid);

    if (!user) throw new NotFoundException();

    return user;
  }

  async update(uuid: string, updateUserDto: UpdateUserDto) {
    const user = await this._getUser(uuid);

    console.log(user);
    if (!user) throw new NotFoundException();

    return prisma.user.update({
      where: { uuid: user.uuid },
      data: updateUserDto,
    });
  }

  async softDelete(uuid: string) {
    const user = await this._getUser(uuid);

    if (!user) throw new NotFoundException();

    return prisma.user.update({
      where: { uuid: user.uuid },
      data: { deleted_at: new Date() },
    });
  }

  private _getUser(uuid: string) {
    return prisma.user.findUnique({
      where: { uuid },
    });
  }
}
