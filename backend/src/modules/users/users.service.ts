import prisma from 'src/client';
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { tryCatch } from 'src/shared/utils/tryCatch';

@Injectable()
export class UsersService {
  async create(createUserDto: CreateUserDto) {
    const user = await this._getUserByEmail(createUserDto.email);

    const userExists = !!user;

    if (userExists) throw new ConflictException('Email already exists');

    const userCreatedPromise = prisma.user.create({ data: createUserDto });

    const [data] = await tryCatch(userCreatedPromise);

    return data;
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

    if (!user) throw new NotFoundException('User not found');

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

  private _getUserByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email },
      select: { email: true },
    });
  }
}
