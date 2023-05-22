import { Test } from '@nestjs/testing';
import { GroupsService } from 'src/modules/groups/groups.service';
import { GroupsController } from '../../modules/groups/groups.controller';
import { GroupMembersService } from 'src/modules/group-members/group-members.service';

describe('Groups Controller', () => {
  let controller: GroupsController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [GroupsController],
      providers: [GroupsService, GroupMembersService],
    }).compile();

    controller = module.get(GroupsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should be defined', () => {
      expect(controller.create).toBeDefined();
    });
  });

  describe('findAll', () => {
    it('should be defined', () => {
      expect(controller.findAll).toBeDefined();
    });
  });

  describe('findOne', () => {
    it('should be defined', () => {
      expect(controller.findOne).toBeDefined();
    });
  });

  describe('update', () => {
    it('should be defined', () => {
      expect(controller.update).toBeDefined();
    });
  });

  describe('softDelete', () => {
    it('should be defined', () => {
      expect(controller.softDelete).toBeDefined();
    });
  });
});
