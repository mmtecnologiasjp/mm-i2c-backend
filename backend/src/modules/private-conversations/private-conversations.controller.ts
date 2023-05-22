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

@ApiEndpoints({
  tag: 'PrivateConversations',
  schemas: [PrivateConversation],
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

  @Get()
  @ApiGetOne({ Schema: PrivateConversation })
  findOne(@Param('uuid') uuid: string) {
    return this.privateConversationsService.findOne(uuid);
  }

  @Get(':userUUID')
  @ApiGetAll({ Schema: PrivateConversation })
  findPrivateConversationsByUserUUID(@Param('userUUID') userUUID: string) {
    return this.privateConversationsService.findPrivateConversationsByUserUUID(
      userUUID,
    );
  }
}
