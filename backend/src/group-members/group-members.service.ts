import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateGroupMemberDto } from './dto/create-group-member.dto';
import { UpdateGroupMemberDto } from './dto/update-group-member.dto';
import prisma from 'src/client';

@Injectable()
export class GroupMembersService {
  create(createGroupMemberDto: CreateGroupMemberDto) {
    return prisma.groupMember.create({ data: createGroupMemberDto });
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
}
