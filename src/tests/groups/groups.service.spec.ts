import { prismaMock } from '../prisma-mock';
import { Test } from '@nestjs/testing';
import {
  createGroupInput,
  group,
  updateGroupInput,
} from './mock/groups.service.mock';
import { GroupsService } from 'src/modules/groups/groups.service';
import { NotFoundException } from '@nestjs/common';
import { messageMock } from '../messages/mock/messages.service.mock';
import {
  createGroupMemberInput,
  groupMemberMock,
} from '../group-members/mock/group-members.mock';
import { GroupMembersService } from '../../modules/group-members/group-members.service';
import { userMock } from '../users/mock/users.service.mock';
import { taskMock } from '../tasks/mock/tasks.mock';

jest.useFakeTimers().setSystemTime(new Date('2023-01-01'));

describe('GroupsService', () => {
  let service: GroupsService;
  let groupMemberService: GroupMembersService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        GroupsService,
        {
          provide: GroupMembersService,
          useValue: {
            create: prismaMock.groupMember.create,
          },
        },
      ],
    }).compile();

    service = module.get(GroupsService);
    groupMemberService = module.get(GroupMembersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should list all groups', async () => {
      prismaMock.group.findMany.mockResolvedValue([group, group]);

      const groups = await service.findAll();
      expect(groups).toBeInstanceOf(Array);
      expect(groups).toHaveLength(2);
    });
  });

  describe('findOne', () => {
    it('should return a group', async () => {
      prismaMock.group.findUnique.mockResolvedValue({
        ...group,
        messages: prismaMock.message.findMany.mockResolvedValue([messageMock]),
        tasks: prismaMock.task.findMany.mockResolvedValue([taskMock]),
      });

      const groupFound = await service.findOne(group.uuid);
      expect(groupFound).toMatchObject(group);
      expect(groupFound).not.toHaveProperty('uuid', '02');
      expect(groupFound).toHaveProperty('messages');
      expect(groupFound).toHaveProperty('tasks');
      expect(prismaMock.group.findUnique).toHaveBeenCalledWith({
        where: { uuid: group.uuid },
        include: {
          messages: {
            include: {
              sender: true,
            },
          },
          tasks: true,
        },
      });
    });
  });

  describe('create', () => {
    it('should create a group', async () => {
      prismaMock.group.create.mockResolvedValue(group);

      const groupCreated = await service.create(createGroupInput);
      expect(groupCreated).toMatchObject(group);
      expect(groupCreated).not.toHaveProperty('uuid', '02');
    });

    it('should create a register in group-members when creating a group', async () => {
      const newGroup = {
        ...group,
        uuid: createGroupMemberInput.group_uuid,
        user_uuid: createGroupMemberInput.user_uuid,
      };

      prismaMock.group.create.mockResolvedValue(newGroup);
      prismaMock.groupMember.create.mockResolvedValue(groupMemberMock);

      await service.create(createGroupInput);

      const mockedGroupMemberCreateMethod = jest.spyOn(
        groupMemberService,
        'create',
      );

      expect(mockedGroupMemberCreateMethod).toHaveBeenCalled();
      expect(prismaMock.groupMember.create).toHaveBeenCalledWith(
        createGroupMemberInput,
      );
    });
  });

  describe('update', () => {
    it('should update a group', async () => {
      prismaMock.group.findUnique.mockResolvedValue(group);
      prismaMock.group.update.mockResolvedValue(group);

      const groupUpdated = await service.update(group.uuid, updateGroupInput);
      expect(groupUpdated).toMatchObject(group);
      expect(groupUpdated).not.toHaveProperty('uuid', '02');
    });

    it('should return a comprehensive error if group not found', async () => {
      prismaMock.group.findUnique.mockResolvedValue(null);

      const groupNotFoundPromise = service.update('09', createGroupInput);
      expect(groupNotFoundPromise).rejects.toThrowError(NotFoundException);
    });
  });

  describe('softDelete', () => {
    it('should soft delete a group', async () => {
      prismaMock.group.findUnique.mockResolvedValue(group);
      const newGroup = { ...group, deleted_at: new Date() };
      prismaMock.group.update.mockResolvedValue(newGroup);

      const groupDeleted = await service.softDelete('01');
      expect(groupDeleted).toMatchObject(newGroup);
      expect(groupDeleted).not.toHaveProperty('uuid', '02');
      expect(groupDeleted).toHaveProperty('deleted_at', new Date());
    });

    it('should return a comprehensive error if group not found', async () => {
      prismaMock.group.findUnique.mockResolvedValue(null);

      const groupNotFoundPromise = service.softDelete('04');
      expect(groupNotFoundPromise).rejects.toThrowError(NotFoundException);
    });
  });

  describe('findAllByUserUUID', () => {
    it('should return an array of groups', async () => {
      const onlyGroupSelectedFromGroupMember = {
        ...groupMemberMock,
        group,
      };

      prismaMock.groupMember.findMany.mockResolvedValue([
        onlyGroupSelectedFromGroupMember,
      ]);

      const groups = await service.findAllByUserUUID(userMock.uuid);

      expect(groups).toEqual([group]);
    });
  });
});
