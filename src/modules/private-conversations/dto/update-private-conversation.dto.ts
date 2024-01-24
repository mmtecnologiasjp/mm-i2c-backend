import { PartialType } from '@nestjs/swagger';
import { CreatePrivateConversationDto } from './create-private-conversation.dto';

export class UpdatePrivateConversationDto extends PartialType(
  CreatePrivateConversationDto,
) {}
