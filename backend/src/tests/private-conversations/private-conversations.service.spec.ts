import { prismaMock } from '../prisma-mock';
import { Test } from '@nestjs/testing';
import { PrivateConversationsService } from 'src/modules/private-conversations/private-conversations.service';
import {
  createPrivateConversationInput,
  privateConversationFromUserMock,
  privateConversationMock,
} from './mock/private-conversations.service.mock';
import * as tryCatchMock from 'src/shared/utils/tryCatch';
import type { TryCatch } from 'src/shared/utils/tryCatch';
import { PrivateConversation } from '@prisma/client';
import { userMock } from '../users/mock/users.service.mock';

jest.mock('src/shared/utils/tryCatch');
jest.useFakeTimers().setSystemTime(new Date('2023-01-01'));

describe('Private Conversations Service', () => {
  let service: PrivateConversationsService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [PrivateConversationsService],
    }).compile();

    service = module.get(PrivateConversationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAllByUserUUID', () => {
    it('should call private conversation findMany with user uuid', async () => {
      const privateConversationWithOnlyUsers = {
        ...privateConversationMock,
        to: userMock,
        from: userMock,
      };

      prismaMock.privateConversation.findMany.mockResolvedValue([
        privateConversationWithOnlyUsers,
      ]);
      const privateConversationUsers = await service.findAllByUserUUID(
        privateConversationFromUserMock.uuid,
      );

      expect(prismaMock.privateConversation.findMany).toBeCalledWith({
        where: {
          OR: [
            { from_uuid: privateConversationFromUserMock.uuid },
            { to_uuid: privateConversationFromUserMock.uuid },
          ],
        },
        select: {
          from: true,
          to: true,
          uuid: true,
        },
      });

      expect(privateConversationUsers.at(0)).toHaveProperty(
        'privateConversationUuid',
      );
    });
  });

  describe('findOne', () => {
    it('should call private conversation findUnique with uuid', async () => {
      await service.findOne(privateConversationMock.uuid);

      expect(prismaMock.privateConversation.findUnique).toHaveBeenCalledWith({
        where: { uuid: privateConversationMock.uuid },
        include: {
          tasks: true,
          messages: {
            include: {
              sender: true,
            },
          },
        },
      });
    });
  });

  describe('create', () => {
    it('should create a private conversation and return user info', async () => {
      const privateConversationWithOnlyUsers = {
        ...privateConversationMock,
        to: userMock,
        from: userMock,
      };

      prismaMock.privateConversation.create.mockResolvedValue(
        privateConversationWithOnlyUsers,
      );

      const privateConversationUser = await service.create(
        createPrivateConversationInput,
      );
      expect(prismaMock.privateConversation.create).toBeCalledWith({
        data: createPrivateConversationInput,
        select: { from: true, to: true, uuid: true },
      });
      expect(privateConversationUser).toHaveProperty('privateConversationUuid');
    });

    it('should not create a private conversation', async () => {
      const createPrivateConversationMock = jest.spyOn(
        tryCatchMock,
        'tryCatch',
      );

      createPrivateConversationMock.mockResolvedValue([
        null,
        new Error('Error'),
      ] as unknown as TryCatch<PrivateConversation>);

      const privateConversationPromise = service.create(
        createPrivateConversationInput,
      );

      expect(privateConversationPromise).rejects.toThrowError(Error);
    });
  });
});
