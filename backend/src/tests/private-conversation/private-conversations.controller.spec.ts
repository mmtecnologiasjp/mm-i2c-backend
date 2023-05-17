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

  describe('All methods should be defined', () => {
    it('create method should be defined', () => {
      expect(controller.create).toBeDefined();
    });

    it('findPrivateConversationsByUserUUID method should be defined', () => {
      expect(controller.findPrivateConversationsByUserUUID).toBeDefined();
    });
  });
});
