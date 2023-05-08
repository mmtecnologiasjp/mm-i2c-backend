import prisma from 'src/client';
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { tryCatch } from 'src/shared/utils/tryCatch';
import { Prisma } from '@prisma/client';
import { PrismaError } from 'prisma-error-enum';
import { NotFoundError } from '@prisma/client/runtime';

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
    return prisma.group.findUnique({ where: { uuid } });
  }

  async update(uuid: string, updateGroupDto: UpdateGroupDto) {
    const updateGroupPromise = prisma.group.update({
      data: updateGroupDto,
      where: { uuid },
    });

    const [data, error] = await tryCatch(updateGroupPromise);

    this._handleError(error);
    if (!data) throw new NotFoundError('Group not found');

    return data;
  }

  async softDelete(uuid: string) {
    const groupUpdatedPromise = prisma.group.update({
      where: { uuid },
      data: { deleted_at: new Date() },
    });

    const [data, error] = await tryCatch(groupUpdatedPromise);

    this._handleError(error);

    if (!data) throw new NotFoundError('Group not found');

    return data;
  }

  private _handleError(
    error: Error | Prisma.PrismaClientKnownRequestError | null,
  ) {
    const isPrismaError = error instanceof Prisma.PrismaClientKnownRequestError;

    if (!isPrismaError && error !== null) {
      throw new InternalServerErrorException('Something went wrong');
    }

    if (error?.code === PrismaError.UniqueConstraintViolation) {
      throw new ConflictException('Group already exists');
    }
  }
}
