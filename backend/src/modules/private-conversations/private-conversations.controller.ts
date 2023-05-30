import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { PrivateConversationsService } from './private-conversations.service';
import { CreatePrivateConversationDto } from './dto/create-private-conversation.dto';
import {
  ApiCreate,
  ApiEndpoints,
  ApiGetAll,
  ApiGetOne,
} from 'src/shared/utils/swagger/endpoints-decorators';
import { PrivateConversation } from './entities/private-conversation.entity';
import { PrivateConversationWithMessagesAndTasks } from './swagger/schemas/private-conversations-with-messages';
import { PrivateConversationsUser } from './swagger/schemas/private-conversations-users';

@ApiEndpoints({
  tag: 'PrivateConversations',
  schemas: [
    PrivateConversation,
    PrivateConversationWithMessagesAndTasks,
    PrivateConversationsUser,
  ],
})
@Controller('private-conversations')
export class PrivateConversationsController {
  constructor(
    private readonly privateConversationsService: PrivateConversationsService,
  ) {}

  @Post()
  @ApiCreate({ Schema: PrivateConversationsUser })
  create(@Body() createPrivateConversationDto: CreatePrivateConversationDto) {
    return this.privateConversationsService.create(
      createPrivateConversationDto,
    );
  }

  @Get('/:uuid')
  @ApiGetOne({ Schema: PrivateConversationWithMessagesAndTasks })
  findOne(@Param('uuid') uuid: string) {
    return this.privateConversationsService.findOne(uuid);
  }

  @Get('/user/:userUUID')
  @ApiGetAll({ Schema: PrivateConversationsUser })
  findAllByUserUUID(@Param('userUUID') userUUID: string) {
    return this.privateConversationsService.findAllByUserUUID(userUUID);
  }
}
