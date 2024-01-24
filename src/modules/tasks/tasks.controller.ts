import { Controller, Post, Body, Patch, Param, Put } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import {
  ApiCreate,
  ApiEndpoints,
  ApiSoftDelete,
  ApiUpdate,
} from 'src/shared/utils/swagger/endpoints-decorators';
import { SoftDeletedTask } from './swagger/task-soft-deleted';
import { Task } from './entities/task.entity';

@ApiEndpoints({ tag: 'Tasks', schemas: [Task, SoftDeletedTask] })
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @ApiCreate({ Schema: Task })
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(createTaskDto);
  }

  @Patch(':uuid')
  @ApiUpdate({ Schema: Task })
  update(@Param('uuid') uuid: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.update(uuid, updateTaskDto);
  }

  @Put(':uuid')
  @ApiSoftDelete({ SoftDeletedSchema: SoftDeletedTask })
  softDelete(@Param('uuid') uuid: string) {
    return this.tasksService.softDelete(uuid);
  }
}
