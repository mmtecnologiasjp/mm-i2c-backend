import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { Message } from 'src/modules/messages/entities/message.entity';

@WebSocketGateway({ cors: true })
export class MessageGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('send-message')
  handleMessage(@MessageBody() message: Message) {
    this.server.emit('server-message', message);
    console.log('message emit!');
    console.count();
  }
}
