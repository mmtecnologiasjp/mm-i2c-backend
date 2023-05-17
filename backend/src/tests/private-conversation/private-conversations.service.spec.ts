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

  describe('findAllPrivateConversationsByUserUUID', () => {
    it('should call private conversation findMany with user uuid', async () => {
      await service.findPrivateConversationsByUserUUID(
        privateConversationFromUserMock.uuid,
      );

      expect(prismaMock.privateConversation.findMany).toHaveBeenCalledWith({
        where: {
          from_uuid: privateConversationFromUserMock.uuid,
          OR: { to_uuid: privateConversationFromUserMock.uuid },
        },
      });
    });

    describe('create', () => {
      it('should create a private conversation', async () => {
        const createPrivateConversationMock = jest.spyOn(
          tryCatchMock,
          'tryCatch',
        );

        createPrivateConversationMock.mockResolvedValue([
          privateConversationMock,
          null,
        ] as unknown as TryCatch<PrivateConversation>);

        const privateConversationResponse = await service.create(
          createPrivateConversationInput,
        );

        expect(privateConversationResponse).toEqual(privateConversationMock);
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
});
