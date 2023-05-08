import { prismaMock } from '../prisma-mock';
import { Test } from '@nestjs/testing';
import { createGroupInput, group } from './mock/groups.service.mock';
import { GroupsController } from 'src/modules/groups/groups.controller';
import { GroupsService } from 'src/modules/groups/groups.service';

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
