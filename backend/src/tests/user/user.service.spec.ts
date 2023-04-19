import { Test, TestingModule } from '@nestjs/testing';
import { prismaMock } from '../prisma-mock';
import { UsersService } from 'src/users/users.service';
import {
  user,
  createUserInput,
  updateUserInput,
} from './mock/user.service.mock';

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

  it('should find a user by uuid', async () => {
    prismaMock.users.findUnique.mockResolvedValue(user);
    const userFound = service.findOne(user.uuid);
    expect(userFound).toBeInstanceOf(Object);
  });

  it('should create a user', async () => {
    prismaMock.users.create.mockResolvedValue(user);
    const userCreated = service.create(createUserInput);
    expect(userCreated).toBeInstanceOf(Object);
  });

  it('should update a user', async () => {
    prismaMock.users.update.mockResolvedValue(user);
    await service.update(user.uuid, updateUserInput);

    expect(prismaMock.users.update).toBeCalledWith({
      where: { uuid: user.uuid },
      data: updateUserInput,
    });
    expect(prismaMock.users.update).toBeCalledTimes(1);
  });

  it('should soft delete a user', async () => {
    prismaMock.users.update.mockResolvedValue(user);
    await service.softDelete(user.uuid);

    expect(prismaMock.users.update).toBeCalledWith({
      where: { uuid: user.uuid },
      data: {
        deleted_at: new Date(),
      },
    });
    expect(prismaMock.users.update).toBeCalledTimes(1);
  });
});
