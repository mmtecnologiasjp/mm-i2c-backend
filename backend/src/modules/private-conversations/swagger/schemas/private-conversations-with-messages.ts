import { Message } from 'src/modules/messages/entities/message.entity';
import { PrivateConversation } from '../../entities/private-conversation.entity';
import { ApiProperty } from '@nestjs/swagger';

export class PrivateConversationWithMessages extends PrivateConversation {
  @ApiProperty({ type: Message, isArray: true })
  messages: Message[];
}
