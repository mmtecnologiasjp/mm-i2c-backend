import { Message } from 'src/modules/messages/entities/message.entity';
import { Group } from '../../entities/group.entity';
import { ApiProperty } from '@nestjs/swagger';

export class GroupMessages extends Group {
  @ApiProperty({ type: Message, isArray: true })
  messages: Message[];
}
