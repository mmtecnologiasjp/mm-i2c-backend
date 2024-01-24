import { Task } from '@prisma/client';
import { CreateTaskDto } from 'src/modules/tasks/dto/create-task.dto';
import { UpdateTaskDto } from 'src/modules/tasks/dto/update-task.dto';
import { generateUUID } from 'src/shared/utils/uuid/generateUUID';

const taskMock: Task = {
  uuid: generateUUID(),
} as unknown as Task;

const createTaskInputMock: CreateTaskDto = {} as unknown as CreateTaskDto;

const updateTaskInputMock: UpdateTaskDto = {} as unknown as UpdateTaskDto;

export { taskMock, createTaskInputMock, updateTaskInputMock };
