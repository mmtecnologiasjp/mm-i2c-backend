import { prismaMock } from '../prisma-mock';
import { Test } from '@nestjs/testing';
import { GroupsController } from 'src/groups/groups.controller';
import { GroupsService } from 'src/groups/groups.service';
import { createGroupInput, group } from './mock/groups.service.mock';

describe('UserController', () => {
  let controller: GroupsController;
  let service: GroupsService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [GroupsController],
      providers: [GroupsService],
    }).compile();

    controller = module.get(GroupsController);
    service = module.get(GroupsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call the service with the correct parameters', async () => {
    prismaMock.group.create.mockResolvedValue(group);
    const spy = jest.spyOn(controller, 'create');
    controller.create(createGroupInput);
    expect(spy).toHaveBeenCalledWith(createGroupInput);
  });

  it('should call the service correctly', async () => {
    jest.spyOn(service, 'findAll');
    controller.findAll();
    expect(service.findAll).toHaveBeenCalled();
  });
});
