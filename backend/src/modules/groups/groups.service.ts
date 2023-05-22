import prisma from 'src/client';
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { tryCatch } from 'src/shared/utils/tryCatch';
import { Prisma } from '@prisma/client';

@Injectable()
export class GroupsService {
  async create(createGroupDto: CreateGroupDto) {
    const createGroupPromise = prisma.group.create({ data: createGroupDto });

    const [data, error] = await tryCatch(createGroupPromise);

    this._handleError(error);

    return data;
  }

  findAll() {
    return prisma.group.findMany();
  }

  findOne(uuid: string) {
    return prisma.group.findUnique({
      where: { uuid },
      include: { messages: true },
    });
  }

  async update(uuid: string, updateGroupDto: UpdateGroupDto) {
    const group = await this._getGroup(uuid);

    if (!group) throw new NotFoundException('Group not found');

    const updateGroupPromise = prisma.group.update({
      data: updateGroupDto,
      where: { uuid },
    });

    const [data, error] = await tryCatch(updateGroupPromise);

    this._handleError(error);

    return data;
  }

  async softDelete(uuid: string) {
    const group = await this._getGroup(uuid);

    if (!group) throw new NotFoundException('Group not found');

    const groupUpdatedPromise = prisma.group.update({
      where: { uuid },
      data: { deleted_at: new Date() },
    });

    const [data, error] = await tryCatch(groupUpdatedPromise);

    this._handleError(error);

    return data;
  }

  private _getGroup(uuid: string) {
    return prisma.group.findUnique({ where: { uuid } });
  }

  private _handleError(
    error: Error | Prisma.PrismaClientKnownRequestError | null,
  ) {
    const isPrismaError = error instanceof Prisma.PrismaClientKnownRequestError;

    if (!isPrismaError && error !== null) {
      throw new InternalServerErrorException('Something went wrong');
    }
  }
}
