import { Test } from '@nestjs/testing';
import { PrivateConversationsController } from 'src/modules/private-conversations/private-conversations.controller';
import { PrivateConversationsService } from 'src/modules/private-conversations/private-conversations.service';

describe('Private Conversation Controller', () => {
  let controller: PrivateConversationsController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [PrivateConversationsController],
      providers: [PrivateConversationsService],
    }).compile();

    controller = module.get<PrivateConversationsController>(
      PrivateConversationsController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should be defined', () => {
      expect(controller.create).toBeDefined();
    });
  });

  describe('findOne', () => {
    it('should be defined', () => {
      expect(controller.findOne).toBeDefined();
    });
  });

  describe('findAllByUserUUID', () => {
    it('should be defined', () => {
      expect(controller.findAllByUserUUID).toBeDefined();
    });
  });
});
