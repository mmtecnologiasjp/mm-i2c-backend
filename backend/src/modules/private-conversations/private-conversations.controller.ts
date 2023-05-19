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
import { PrivateConversationWithMessages } from './swagger/schemas/private-conversations-with-messages';

@ApiEndpoints({
  tag: 'PrivateConversations',
  schemas: [PrivateConversation, PrivateConversationWithMessages],
})
@Controller('private-conversations')
export class PrivateConversationsController {
  constructor(
    private readonly privateConversationsService: PrivateConversationsService,
  ) {}

  @Post()
  @ApiCreate({ Schema: PrivateConversation })
  create(@Body() createPrivateConversationDto: CreatePrivateConversationDto) {
    return this.privateConversationsService.create(
      createPrivateConversationDto,
    );
  }

  @Get('/:uuid')
  @ApiGetOne({ Schema: PrivateConversationWithMessages })
  findOne(@Param('uuid') uid: string) {
    return this.privateConversationsService.findOne(uid);
  }

  @Get('/user/:userUUID')
  @ApiGetAll({ Schema: PrivateConversation })
  findAllByUserUUID(@Param('userUUID') userUUID: string) {
    return this.privateConversationsService.findAllByUserUUID(userUUID);
  }
}
