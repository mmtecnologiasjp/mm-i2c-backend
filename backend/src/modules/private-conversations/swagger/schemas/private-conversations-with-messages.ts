import { Message } from 'src/modules/messages/entities/message.entity';
import { PrivateConversation } from '../../entities/private-conversation.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Task } from 'src/modules/tasks/entities/task.entity';

export class PrivateConversationWithMessagesAndTasks extends PrivateConversation {
  @ApiProperty({ type: Message, isArray: true })
  messages: Message[];

  @ApiProperty({ type: Task, isArray: true })
  tasks: Task[];
}
