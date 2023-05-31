import { Message } from 'src/modules/messages/entities/message.entity';
import { User } from 'src/modules/users/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

export class MessageSender extends Message {
  @ApiProperty({ type: User })
  sender: User;
}
