import { prismaMock } from '../prisma-mock';
import { Test } from '@nestjs/testing';
import {
  createGroupInput,
  group,
  updateGroupInput,
} from './mock/groups.service.mock';
import { GroupsService } from 'src/modules/groups/groups.service';
import { NotFoundException } from '@nestjs/common';

jest.useFakeTimers().setSystemTime(new Date('2023-01-01'));

describe('GroupsService', () => {
  let service: GroupsService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [GroupsService],
    }).compile();

    service = module.get(GroupsService);
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
      prismaMock.group.findUnique.mockResolvedValue(group);

      const groupFound = await service.findOne('01');
      expect(groupFound).toMatchObject(group);
      expect(groupFound).not.toHaveProperty('uuid', '02');
    });
  });

  describe('create', () => {
    it('should create a group', async () => {
      prismaMock.group.create.mockResolvedValue(group);

      const groupCreated = await service.create(createGroupInput);
      expect(groupCreated).toMatchObject(group);
      expect(groupCreated).not.toHaveProperty('uuid', '02');
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
});
