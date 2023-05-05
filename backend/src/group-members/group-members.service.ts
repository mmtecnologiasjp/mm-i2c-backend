import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateGroupMemberDto } from './dto/create-group-member.dto';
import { UpdateGroupMemberDto } from './dto/update-group-member.dto';
import prisma from 'src/client';
import { tryCatch } from 'src/utils/tryCatch';
import { Prisma } from '@prisma/client';
import { PrismaError } from 'prisma-error-enum';

@Injectable()
export class GroupMembersService {
  async create(createGroupMemberDto: CreateGroupMemberDto) {
    const groupPromise = prisma.group.findUnique({
      where: { uuid: createGroupMemberDto.group_uuid },
    });
    const userPromise = prisma.user.findUnique({
      where: { uuid: createGroupMemberDto.user_uuid },
    });

    const [group, user] = await Promise.all([groupPromise, userPromise]);

    if (!group || !user) throw new NotFoundException('Group or user not found');

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
    const userUpdated = prisma.groupMember.update({
      data: updateGroupMemberDto,
      where: { uuid },
    });

    if (!userUpdated) {
      throw new NotFoundException(`Group member with uuid ${uuid} not found`);
    }

    return userUpdated;
  }

  async softDelete(uuid: string) {
    const groupMember = prisma.groupMember.update({
      data: {
        deleted_at: new Date(),
      },
      where: {
        uuid,
      },
    });

    if (!groupMember)
      throw new NotFoundException(`Group member with uuid ${uuid} not found`);

    return groupMember;
  }

  findGroupMembersByGroupUUID(uuid: string) {
    return prisma.groupMember.findMany({ where: { group_uuid: uuid } });
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
