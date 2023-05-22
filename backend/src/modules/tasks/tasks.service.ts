import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import prisma from 'src/client';

@Injectable()
export class TasksService {
  taskNotFound = 'Task not found';

  async create(createTaskDto: CreateTaskDto) {
    const createTask = await prisma.task.create({ data: createTaskDto });

    return createTask;
  }

  async update(uuid: string, updateTaskDto: UpdateTaskDto) {
    const task = await this._getTask(uuid);

    if (!task) throw new NotFoundException(this.taskNotFound);

    const updateTask = await prisma.task.update({
      where: { uuid },
      data: updateTaskDto,
    });

    return updateTask;
  }

  async softDelete(uuid: string) {
    const task = await this._getTask(uuid);

    if (!task) throw new NotFoundException(this.taskNotFound);

    const softDeleteTask = await prisma.task.update({
      where: { uuid },
      data: { deleted_at: new Date() },
    });

    return softDeleteTask;
  }

  private _getTask(uuid: string) {
    return prisma.task.findUnique({ where: { uuid } });
  }
}
