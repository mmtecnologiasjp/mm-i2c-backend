import { Test } from '@nestjs/testing';
import { TasksController } from 'src/modules/tasks/tasks.controller';
import { TasksService } from 'src/modules/tasks/tasks.service';

describe('Tasks Controller', () => {
  let controller: TasksController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [TasksService],
    }).compile();

    controller = module.get(TasksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should be defined', () => {
      expect(controller.create).toBeDefined();
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
});
