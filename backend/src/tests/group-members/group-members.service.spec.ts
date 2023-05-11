import { prismaMock } from '../prisma-mock';
import { Test } from '@nestjs/testing';
import {
  createGroupMemberInput,
  groupMemberGroupMock,
  groupMemberMock,
  groupMemberUserMock,
  updateGroupMemberInput,
} from './mock/group-members.mock';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { GroupMembersService } from 'src/modules/group-members/group-members.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { PrismaError } from 'prisma-error-enum';

jest.useFakeTimers().setSystemTime(new Date('2023-01-01'));

describe('GroupMembers Service', () => {
  let service: GroupMembersService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [GroupMembersService],
    }).compile();

    service = module.get(GroupMembersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a group member', async () => {
      prismaMock.group.findUnique.mockResolvedValue(groupMemberGroupMock);
      prismaMock.user.findUnique.mockResolvedValue(groupMemberUserMock);
      prismaMock.groupMember.create.mockResolvedValue(groupMemberMock);

      const groupMember = await service.create(createGroupMemberInput);

      expect(groupMember).toEqual(groupMemberMock);
    });

    it('should return a comprehensive error if group member already exists', async () => {
      prismaMock.groupMember.create.mockRejectedValue(
        new PrismaClientKnownRequestError(
          'Unique constraint violation',
          PrismaError.UniqueConstraintViolation,
          '1',
        ),
      );

      const groupMember = service.create(createGroupMemberInput);

      await Promise.all([
        expect(groupMember).rejects.toThrowError(ConflictException),
      ]);
    });
  });

  describe('findAllGroupMembersByGroupUUID', () => {
    it('should return an array of group members', async () => {
      const groupMemberWithUser = {
        ...groupMemberMock,
        user: groupMemberUserMock,
      };

      prismaMock.groupMember.findMany.mockResolvedValue([groupMemberWithUser]);
      const groupMember = await service.findGroupMembersByGroupUUID(
        groupMemberGroupMock.uuid,
      );

      expect(groupMember).toEqual([groupMemberWithUser]);
      expect(groupMember).toHaveLength(1);
    });
  });

  describe('update', () => {
    it('should update a group member', async () => {
      const { role: newRole } = updateGroupMemberInput;

      prismaMock.groupMember.findUnique.mockResolvedValue(groupMemberMock);
      prismaMock.groupMember.update.mockResolvedValue({
        ...groupMemberMock,
        role: newRole ?? 'Member',
      });

      const groupMemberUpdated = await service.update(groupMemberMock.uuid, {
        role: newRole,
      });

      expect(groupMemberUpdated).toHaveProperty('role', newRole);
      expect(prismaMock.groupMember.update).toHaveBeenCalledWith({
        data: {
          role: newRole,
        },
        where: {
          uuid: groupMemberMock.uuid,
        },
      });
    });

    it('should return a comprehensive error if group member not found', async () => {
      prismaMock.groupMember.findUnique.mockResolvedValue(null);

      const groupNotFoundPromise = service.update('01', {
        role: 'Admin',
      });

      expect(groupNotFoundPromise).rejects.toThrowError(NotFoundException);
    });
  });

  describe('softDelete', () => {
    it('should soft delete a group member', async () => {
      prismaMock.groupMember.findUnique.mockResolvedValue(groupMemberMock);

      const newGroupMemberSoftDeleted = {
        ...groupMemberMock,
        deleted_at: new Date(),
      };

      prismaMock.groupMember.update.mockResolvedValue(
        newGroupMemberSoftDeleted,
      );

      const groupMember = await service.softDelete(groupMemberMock.uuid);
      expect(groupMember).toMatchObject(newGroupMemberSoftDeleted);
      expect(prismaMock.groupMember.update).toHaveBeenCalledWith({
        data: {
          deleted_at: new Date(),
        },
        where: {
          uuid: groupMemberMock.uuid,
        },
      });
      expect(groupMember.deleted_at).toBeInstanceOf(Date);
    });

    it('should return a comprehensive error if group member not found', async () => {
      prismaMock.groupMember.findUnique.mockResolvedValue(null);

      const groupNotFoundPromise = service.softDelete(groupMemberMock.uuid);
      expect(groupNotFoundPromise).rejects.toThrowError(NotFoundException);
    });
  });
});
