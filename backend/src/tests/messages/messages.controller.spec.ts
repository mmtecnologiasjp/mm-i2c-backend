import { MessagesService } from 'src/modules/messages/messages.service';
import { MessagesController } from '../../modules/messages/messages.controller';
import { Test } from '@nestjs/testing';

describe('Messages Controller', () => {
  let controller: MessagesController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [MessagesController],
      providers: [MessagesService],
    }).compile();

    controller = module.get(MessagesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should be defined', () => {
      expect(controller.create).toBeDefined();
    });
  });

  describe('update', () => {
    it('should be defined', () => {
      expect(controller.update).toBeDefined();
    });
  });

  describe('softDelete', () => {
    it('should be defined', () => {
      expect(controller.softDelete).toBeDefined();
    });
  });
});
