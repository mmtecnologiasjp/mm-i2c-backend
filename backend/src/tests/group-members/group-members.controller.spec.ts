import { Test } from '@nestjs/testing';
import { GroupMembersController } from 'src/group-members/group-members.controller';
import { GroupMembersService } from 'src/group-members/group-members.service';

describe('GroupMembers Controller', () => {
  let controller: GroupMembersController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [GroupMembersController],
      providers: [GroupMembersService],
    }).compile();

    controller = module.get(GroupMembersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should be defined', () => {
      expect(controller.create).toBeDefined();
    });
  });

  describe('findGroupMembersByGroupUuid', () => {
    it('should be defined', () => {
      expect(controller.findGroupMembersByGroupUUID).toBeDefined();
    });
  });

  describe('findOne', () => {
    it('should be defined', () => {
      expect(controller.findOne).toBeDefined();
    });
  });

  describe('softDelete', () => {
    it('should be defined', () => {
      expect(controller.softDelete).toBeDefined();
    });
  });

  describe('update', () => {
    it('should be defined', () => {
      expect(controller.update).toBeDefined();
    });
  });
});
