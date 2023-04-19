import { Test, TestingModule } from '@nestjs/testing';
import { prismaMock } from '../prisma-mock';
import { UsersService } from 'src/users/users.service';
import { user } from './mock/user.service.mock';

describe('UsersSerice', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    service = module.get(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should list all users', async () => {
    prismaMock.users.findMany.mockResolvedValue([user, user]);
    const users = await service.findAll();
    expect(users).toBeInstanceOf(Array);
  });
});
