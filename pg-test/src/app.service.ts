import { Injectable } from '@nestjs/common';
import { prisma } from 'prisma/client';

@Injectable()
export class AppService {
  async getHello() {
    const user = await prisma.user.findFirst({
      include: { user_conversations: true },
    });

    return user;
  }
}
