import { prismaMock } from '../prisma-mock';
import { Test } from '@nestjs/testing';
import { MessagesService } from 'src/modules/messages/messages.service';
import {
  createMessageInput,
  messageMock,
  messageMockDeleted,
  updateMessageInput,
} from './mock/messages.service.mock';

jest.useFakeTimers().setSystemTime(new Date('2023-01-01'));

describe('Messages Service', () => {
  let service: MessagesService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [MessagesService],
    }).compile();

    service = module.get(MessagesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a message', async () => {
      prismaMock.message.create.mockResolvedValue(messageMock);
      const messageCreatd = await service.create(createMessageInput);

      expect(messageCreatd).toEqual(messageMock);
      expect(prismaMock.message.create).toHaveBeenCalledWith({
        data: createMessageInput,
      });
    });
  });

  describe('update', () => {
    it('should update a message', async () => {
      const messageToBeUpdated = {
        ...messageMock,
        content: updateMessageInput.content,
      } as typeof messageMock;

      prismaMock.message.update.mockResolvedValue(messageToBeUpdated);

      const messageUpdated = await service.update(
        messageMock.uuid,
        updateMessageInput,
      );

      expect(messageUpdated).toEqual(messageToBeUpdated);
      expect(prismaMock.message.update).toHaveBeenCalledWith({
        data: updateMessageInput,
        where: { uuid: messageMock.uuid },
      });
    });
  });

  describe('softDelete', () => {
    it('should soft delete a message', async () => {
      prismaMock.message.update.mockResolvedValue(messageMockDeleted);
      const messageSoftDeleted = await service.softDelete(messageMock.uuid);

      expect(messageSoftDeleted).toEqual(messageMockDeleted);
      expect(prismaMock.message.update).toHaveBeenCalledWith({
        data: { deleted_at: new Date() },
        where: { uuid: messageMock.uuid },
      });
    });
  });
});
