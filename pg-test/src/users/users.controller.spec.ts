import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { prismaMock } from '../../prisma/prismaMock';
import { userMock } from './mocks/users.resolver.mock';

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return an array of users', () => {
    prismaMock.user.findMany.mockResolvedValue([userMock]);
    expect(controller.findAll()).toBeInstanceOf(Array);
  });
});
