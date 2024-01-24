import { ApiProperty } from '@nestjs/swagger';
import { PrivateConversation } from '../../entities/private-conversation.entity';
import { Task } from 'src/modules/tasks/entities/task.entity';
import { MessageSender } from '../../../../shared/schemas/MessageSender';

export class PrivateConversationWithMessagesAndTasks extends PrivateConversation {
  @ApiProperty({ type: MessageSender, isArray: true })
  messages: MessageSender[];

  @ApiProperty({ type: Task, isArray: true })
  tasks: Task[];
}
