import { prismaMock } from '../prisma-mock';
import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from 'src/modules/tasks/tasks.service';
import {
  taskMock,
  createTaskInputMock,
  updateTaskInputMock,
} from './mock/tasks.mock';
import { NotFoundException } from '@nestjs/common';

jest.useFakeTimers().setSystemTime(new Date('2023-01-01'));

describe('Tasks Service', () => {
  let service: TasksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TasksService],
    }).compile();

    service = module.get(TasksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a task', async () => {
      prismaMock.task.create.mockResolvedValue(taskMock);

      await service.create(createTaskInputMock);

      expect(prismaMock.task.create).toBeCalledWith({
        data: createTaskInputMock,
      });
    });
  });

  describe('update', () => {
    it('should update a task', async () => {
      prismaMock.task.findUnique.mockResolvedValue(taskMock);
      prismaMock.task.update.mockResolvedValue(taskMock);

      await service.update(taskMock.uuid, updateTaskInputMock);

      expect(prismaMock.task.update).toBeCalledWith({
        where: { uuid: taskMock.uuid },
        data: updateTaskInputMock,
      });
    });

    it('should throw an error if the task is not found', async () => {
      prismaMock.task.findUnique.mockResolvedValue(null);

      const taskUpdate = service.update(taskMock.uuid, updateTaskInputMock);

      expect(taskUpdate).rejects.toThrowError(NotFoundException);
    });
  });

  describe('soft delete', () => {
    it('should soft delete a task', async () => {
      prismaMock.task.findUnique.mockResolvedValue(taskMock);
      const newTask = { ...taskMock, deleted_at: new Date() };
      prismaMock.task.update.mockResolvedValue(newTask);

      await service.softDelete(taskMock.uuid);

      expect(prismaMock.task.update).toBeCalledWith({
        where: { uuid: taskMock.uuid },
        data: { deleted_at: new Date() },
      });
    });

    it('should throw an error if the task is not found', async () => {
      const taskDelete = service.softDelete(taskMock.uuid);

      expect(taskDelete).rejects.toThrowError(NotFoundException);
    });
  });
});
