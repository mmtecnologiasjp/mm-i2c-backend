import { Injectable } from '@nestjs/common';
import { prisma } from 'prisma/client';

@Injectable()
export class AppService {
  async getHello() {
    const messages = await prisma.privateConversations.findFirst({
      where: {
        from_uuid: '01',
      },
      include: {
        messages: true,
      },
    });

    return messages;
  }
}
