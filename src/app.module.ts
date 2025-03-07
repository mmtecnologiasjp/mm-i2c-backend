import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { GroupsModule } from './modules/groups/groups.module';
import { GroupMembersModule } from './modules/group-members/group-members.module';
import { PrivateConversationsModule } from './modules/private-conversations/private-conversations.module';
import { TasksModule } from './modules/tasks/tasks.module';
import { MessagesModule } from './modules/messages/messages.module';
import { MessageGateway } from './message/message.gateway';
import { MessagesService } from './modules/messages/messages.service';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { GetUserInfoInterceptor } from './interceptors/get-user-info.interceptor';
import { SsoModule } from './modules/sso/sso.module';

@Module({
  imports: [
    UsersModule,
    GroupsModule,
    PrivateConversationsModule,
    GroupMembersModule,
    MessagesModule,
    TasksModule,
    SsoModule,
  ],
  providers: [
    MessageGateway,
    MessagesService,
    {
      provide: APP_INTERCEPTOR,
      useClass: GetUserInfoInterceptor,
    },
  ],
})
export class AppModule {}
