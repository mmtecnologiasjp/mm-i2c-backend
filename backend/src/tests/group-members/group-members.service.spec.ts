import { prismaMock } from '../prisma-mock';
import { Test } from '@nestjs/testing';
import { GroupMembersService } from 'src/group-members/group-members.service';
import {
  groupMemberGroupMock,
  groupMemberMock,
  groupMemberUserMock,
} from './mock/grou-members.mock';
import { NotFoundException } from '@nestjs/common';
import { RoleEnum } from '@prisma/client';

jest.useFakeTimers().setSystemTime(new Date('2023-01-01'));

describe('GroupMembers service', () => {
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

      const groupMember = await service.create(groupMemberMock);

      expect(groupMember).toEqual(groupMemberMock);
    });

    it('should return a comprehensive error if group or user not found', async () => {
      prismaMock.group.findUnique.mockResolvedValue(null);
      prismaMock.user.findUnique.mockResolvedValue(null);
      const groupOrUserNotFoundPromise = service.create(groupMemberMock);

      expect(groupOrUserNotFoundPromise).rejects.toThrowError(
        NotFoundException,
      );
    });
  });

  describe('findAllGroupMembersByGroupUUID', () => {
    it('should return an array of group members', async () => {
      prismaMock.groupMember.findMany.mockResolvedValue([groupMemberMock]);
      const groupMember = await service.findGroupMembersByGroupUUID(
        groupMemberGroupMock.uuid,
      );

      expect(groupMember).toEqual([groupMemberMock]);
    });

    it('should return an empty array if no group members found', async () => {
      prismaMock.groupMember.findMany.mockResolvedValue([]);

      const groupMember = await service.findGroupMembersByGroupUUID(
        groupMemberGroupMock.uuid,
      );
      expect(groupMember).toEqual([]);
    });
  });

  describe('update', () => {
    it('should update a group member', async () => {
      const secondGroupMember: typeof groupMemberMock = {
        ...groupMemberMock,
        role: 'Member',
        uuid: '02',
      };

      const newRole: RoleEnum = 'Admin';
      prismaMock.groupMember.findUnique.mockResolvedValue(secondGroupMember);
      prismaMock.groupMember.update.mockResolvedValue(secondGroupMember);

      const groupMemberUpdated = await service.update(secondGroupMember.uuid, {
        role: newRole,
      });

      expect(groupMemberUpdated).toEqual(secondGroupMember);
      expect(prismaMock.groupMember.update).toHaveBeenCalledWith({
        data: {
          role: newRole,
        },
        where: {
          uuid: secondGroupMember.uuid,
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
