import { ApiProperty } from '@nestjs/swagger';
import { Task } from 'src/modules/tasks/entities/task.entity';
import { Group } from '../../entities/group.entity';
import { MessageSender } from '../../../../shared/schemas/MessageSender';

export class GroupMessages extends Group {
  @ApiProperty({ type: MessageSender, isArray: true })
  messages: MessageSender[];

  @ApiProperty({ type: Task, isArray: true })
  tasks: Task[];
}
