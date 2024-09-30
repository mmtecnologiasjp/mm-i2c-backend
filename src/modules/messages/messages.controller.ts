import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import {
  ApiCreate,
  ApiEndpoints,
  ApiSoftDelete,
  ApiUpdate,
} from '../../shared/utils/swagger/endpoints-decorators';
import { AuthGuard } from '../auth/guard/auth.guard';
import { Message } from './entities/message.entity';
import { MessageSoftDeleted } from './swagger/schemas/messages.soft-deleted';

const description =
  'If private_conversation_uuid exist, group_uuid must not exist (and vice-versa)';

@Controller('messages')
@ApiEndpoints({ tag: 'Messages', schemas: [Message] })
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post()
  @ApiCreate({
    Schema: Message,
    options: { description },
  })
  @UseGuards(AuthGuard)
  create(@Body() createMessageDto: CreateMessageDto) {
    return this.messagesService.create(createMessageDto);
  }

  @Patch()
  @ApiUpdate({ Schema: Message, options: { description } })
  @UseGuards(AuthGuard)
  update(
    @Param('uuid') uuid: string,
    @Body() updateMessageDto: UpdateMessageDto,
  ) {
    return this.messagesService.update(uuid, updateMessageDto);
  }

  @Delete()
  @ApiSoftDelete({ SoftDeletedSchema: MessageSoftDeleted })
  @UseGuards(AuthGuard)
  softDelete(@Param('uuid') uuid: string) {
    return this.messagesService.softDelete(uuid);
  }
}
