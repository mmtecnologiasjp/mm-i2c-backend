import { prismaMock } from '../prisma-mock';
import { Test, TestingModule } from '@nestjs/testing';
import {
  createUserInput,
  updateUserInput,
  userMock,
} from './mock/users.service.mock';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { UsersService } from 'src/modules/users/users.service';

jest.useFakeTimers().setSystemTime(new Date('2023-01-01'));

describe('Users Serice', () => {
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
      prismaMock.user.findMany.mockResolvedValue([userMock, userMock]);
      const users = await service.findAll();
      expect(users).toBeInstanceOf(Array);
    });
  });

  describe('findOne', () => {
    it('should find a user by uuid', async () => {
      prismaMock.user.findUnique.mockResolvedValue(userMock);
      const userFound = await service.findOne(userMock.uuid);
      expect(userFound).toBeInstanceOf(Object);
    });

    it('should return a comprehensive error if user not found', async () => {
      prismaMock.user.findUnique.mockResolvedValue(null);
      const userNotFoundPromise = service.findOne(userMock.uuid);
      await Promise.all([
        expect(userNotFoundPromise).rejects.toThrowError(NotFoundException),
        expect(userNotFoundPromise).rejects.not.toThrowError(ConflictException),
      ]);
    });
  });

  describe('findOneByEmail', () => {
    it('should return a user found by email', async () => {
      prismaMock.user.findUnique.mockResolvedValue(userMock);
      await service.findOneByEmail(userMock.email);
      expect(prismaMock.user.findUnique).toBeCalledWith({
        where: { email: userMock.email },
      });
    });
  });

  describe('create', () => {
    it('should create a user', async () => {
      prismaMock.user.create.mockResolvedValue(userMock);
      const userCreated = service.create(createUserInput);
      expect(userCreated).toBeInstanceOf(Object);
    });

    it('should return a comprehensive error if user already exists', async () => {
      prismaMock.user.findUnique.mockResolvedValue(userMock);

      await expect(service.create(createUserInput)).rejects.toThrowError(
        ConflictException,
      );
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      prismaMock.user.findUnique.mockResolvedValue(userMock);
      await service.update(userMock.uuid, updateUserInput);
      expect(prismaMock.user.update).toBeCalledWith({
        where: { uuid: userMock.uuid },
        data: updateUserInput,
      });
      expect(prismaMock.user.update).toBeCalledTimes(1);
    });

    it('should return a comprehensive error if user not found', async () => {
      prismaMock.user.findUnique.mockResolvedValue(null);
      const userNotFoundPromise = service.update(
        userMock.uuid,
        updateUserInput,
      );
      await Promise.all([
        expect(userNotFoundPromise).rejects.toThrowError(NotFoundException),
        expect(userNotFoundPromise).rejects.not.toThrowError(ConflictException),
      ]);
    });
  });

  describe('delete', () => {
    it('should soft delete a user', async () => {
      prismaMock.user.findUnique.mockResolvedValue(userMock);
      await service.softDelete(userMock.uuid);

      expect(prismaMock.user.update).toBeCalledWith({
        where: { uuid: userMock.uuid },
        data: {
          deleted_at: new Date(),
        },
      });
      expect(prismaMock.user.update).toBeCalledTimes(1);
    });

    it('should return a comprehensive error if user not found', async () => {
      prismaMock.user.findUnique.mockResolvedValue(null);
      const userNotFoundPromise = service.softDelete(userMock.uuid);
      await Promise.all([
        expect(userNotFoundPromise).rejects.toThrowError(NotFoundException),
        expect(userNotFoundPromise).rejects.not.toThrowError(ConflictException),
      ]);
    });
  });
});
