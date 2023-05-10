import { prismaMock } from '../prisma-mock';
import { Test } from '@nestjs/testing';
import { UsersController } from 'src/users/users.controller';
import { UsersService } from 'src/users/users.service';
import { createUserInput } from './mock/user.service.mock';
import { groupMemberMock } from '../group-members/mock/grou-members.mock';

describe('UserController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    }).compile();

    controller = module.get(UsersController);
    service = module.get(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call the service with the correct parameters', async () => {
    prismaMock.groupMember.create.mockResolvedValue(groupMemberMock);
    const spy = jest.spyOn(controller, 'create');
    controller.create(createUserInput);
    expect(spy).toHaveBeenCalledWith(createUserInput);
  });

  it('should call the service correctly', async () => {
    jest.spyOn(service, 'findAll');
    controller.findAll();
    expect(service.findAll).toHaveBeenCalled();
  });
});
