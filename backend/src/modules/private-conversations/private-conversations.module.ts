import { Module } from '@nestjs/common';
import { PrivateConversationsService } from './private-conversations.service';
import { PrivateConversationsController } from './private-conversations.controller';

@Module({
  controllers: [PrivateConversationsController],
  providers: [PrivateConversationsService],
})
export class PrivateConversationsModule {}
