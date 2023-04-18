import { Injectable } from '@nestjs/common';
import { prisma } from 'prisma/client';

@Injectable()
export class AppService {
  async getHello() {
    const messages = await prisma.messages.findMany({
      where: {
        group_uuid: '01',
      },
      include: {
        group: true,
      },
    });

    return messages;
  }
}
