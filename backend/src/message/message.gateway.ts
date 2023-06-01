import { Inject } from '@nestjs/common';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { CreateMessageDto } from 'src/modules/messages/dto/create-message.dto';
import { Message } from 'src/modules/messages/entities/message.entity';
import { MessagesService } from 'src/modules/messages/messages.service';

@WebSocketGateway({
  cors: true,
})
export class MessageGateway {
  constructor(
    @Inject('messageService') private readonly messageService: MessagesService,
  ) {}

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('send-message')
  async handleMessage(@MessageBody() message: CreateMessageDto) {
    const data = await this.messageService.create(message);

    console.log(data);
    console.log('message emit!');
    console.count();
  }
}
