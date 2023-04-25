import { Test, TestingModule } from '@nestjs/testing';
import { prismaMock } from '../prisma-mock';
import { UsersService } from 'src/users/users.service';
import {
  user,
  createUserInput,
  updateUserInput,
} from './mock/user.service.mock';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { PrismaError } from 'prisma-error-enum';

jest.useFakeTimers().setSystemTime(new Date('2023-01-01'));

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

  describe('findAll', () => {
    it('should list all users', async () => {
      prismaMock.user.findMany.mockResolvedValue([user, user]);
      const users = await service.findAll();
      expect(users).toBeInstanceOf(Array);
    });
  });

  describe('findOne', () => {
    it('should find a user by uuid', async () => {
      prismaMock.user.findUnique.mockResolvedValue(user);
      const userFound = await service.findOne(user.uuid);
      expect(userFound).toBeInstanceOf(Object);
    });

    it('should return a comprehensive error if user not found', async () => {
      prismaMock.user.findUnique.mockResolvedValue(null);
      const userNotFoundPromise = service.findOne(user.uuid);
      await Promise.all([
        expect(userNotFoundPromise).rejects.toThrowError(NotFoundException),
        expect(userNotFoundPromise).rejects.not.toThrowError(ConflictException),
      ]);
    });
  });

  describe('create', () => {
    it('should create a user', async () => {
      prismaMock.user.create.mockResolvedValue(user);
      const userCreated = service.create(createUserInput);
      expect(userCreated).toBeInstanceOf(Object);
    });

    it('should return a comprehensive error if user already exists', async () => {
      prismaMock.user.create.mockRejectedValue({
        code: PrismaError.UniqueConstraintViolation,
        meta: { target: ['email'] },
      });

      await expect(service.create(createUserInput)).rejects.toThrowError(
        ConflictException,
      );
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      prismaMock.user.findUnique.mockResolvedValue(user);
      await service.update(user.uuid, updateUserInput);
      expect(prismaMock.user.update).toBeCalledWith({
        where: { uuid: user.uuid },
        data: updateUserInput,
      });
      expect(prismaMock.user.update).toBeCalledTimes(1);
    });

    it('should return a comprehensive error if user not found', async () => {
      prismaMock.user.findUnique.mockResolvedValue(null);
      const userNotFoundPromise = service.update(user.uuid, updateUserInput);
      await Promise.all([
        expect(userNotFoundPromise).rejects.toThrowError(NotFoundException),
        expect(userNotFoundPromise).rejects.not.toThrowError(ConflictException),
      ]);
    });
  });

  describe('delete', () => {
    it('should soft delete a user', async () => {
      prismaMock.user.findUnique.mockResolvedValue(user);
      await service.softDelete(user.uuid);

      expect(prismaMock.user.update).toBeCalledWith({
        where: { uuid: user.uuid },
        data: {
          deleted_at: new Date(),
        },
      });
      expect(prismaMock.user.update).toBeCalledTimes(1);
    });

    it('should return a comprehensive error if user not found', async () => {
      prismaMock.user.findUnique.mockResolvedValue(null);
      const userNotFoundPromise = service.softDelete(user.uuid);
      await Promise.all([
        expect(userNotFoundPromise).rejects.toThrowError(NotFoundException),
        expect(userNotFoundPromise).rejects.not.toThrowError(ConflictException),
      ]);
    });
  });
});
