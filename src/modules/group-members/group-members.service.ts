import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateGroupMemberDto } from './dto/create-group-member.dto';
import { UpdateGroupMemberDto } from './dto/update-group-member.dto';
import prisma from 'src/client';
import { tryCatch } from 'src/shared/utils/tryCatch';
import { Prisma } from '@prisma/client';
import { PrismaError } from 'prisma-error-enum';

@Injectable()
export class GroupMembersService {
  async create(createGroupMemberDto: CreateGroupMemberDto) {
    const groupMember = await prisma.groupMember.findFirst({
      where: {
        group_uuid: createGroupMemberDto.group_uuid,
        user_uuid: createGroupMemberDto.user_uuid,
      },
      select: {
        uuid: true,
      },
    });

    if (groupMember) {
      throw new ConflictException(`This user already exists in this group`);
    }

    const createGroupMemberPromise = prisma.groupMember.create({
      data: createGroupMemberDto,
    });

    const [data, error] = await tryCatch(createGroupMemberPromise);

    this._handleError(error);

    return data;
  }

  findOne(uuid: string) {
    return prisma.groupMember.findUnique({ where: { uuid } });
  }

  async update(uuid: string, updateGroupMemberDto: UpdateGroupMemberDto) {
    const groupMember = await prisma.groupMember.findUnique({
      where: { uuid },
    });

    if (!groupMember) {
      throw new NotFoundException(`Group member with uuid ${uuid} not found`);
    }

    const userUpdated = await prisma.groupMember.update({
      data: updateGroupMemberDto,
      where: { uuid },
    });

    return userUpdated;
  }

  async softDelete(uuid: string) {
    const groupMember = await this._findGroupMember(uuid);

    if (!groupMember)
      throw new NotFoundException(`Group member with uuid ${uuid} not found`);

    const groupMemberSoftDeleted = await prisma.groupMember.update({
      data: {
        deleted_at: new Date(),
      },
      where: {
        uuid,
      },
    });

    return groupMemberSoftDeleted;
  }

  findGroupMembersByGroupUUID(uuid: string) {
    return prisma.groupMember.findMany({
      where: { group_uuid: uuid },
      include: {
        user: true,
      },
    });
  }

  private async _findGroupMember(uuid: string) {
    return prisma.groupMember.findUnique({ where: { uuid } });
  }

  private _handleError(
    error: Error | Prisma.PrismaClientKnownRequestError | null,
  ) {
    const isPrismaError = error instanceof Prisma.PrismaClientKnownRequestError;

    if (!isPrismaError && error !== null) {
      throw new InternalServerErrorException('Something went wrong');
    }

    if (error?.code === PrismaError.UniqueConstraintViolation) {
      throw new ConflictException('Unique constraint violation');
    }
  }
}
