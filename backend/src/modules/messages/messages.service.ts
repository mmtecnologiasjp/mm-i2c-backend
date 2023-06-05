import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import prisma from 'src/client';

@Injectable()
export class MessagesService {
  create(createMessageDto: CreateMessageDto) {
    return prisma.message.create({
      data: createMessageDto,
      include: {
        sender: true,
      },
    });
  }

  findAll() {
    return `This action returns all messages`;
  }

  findOne(id: number) {
    return `This action returns a #${id} message`;
  }

  update(uuid: string, updateMessageDto: UpdateMessageDto) {
    return prisma.message.update({
      data: updateMessageDto,
      where: {
        uuid: uuid,
      },
    });
  }

  softDelete(uuid: string) {
    return prisma.message.update({
      data: { deleted_at: new Date() },
      where: { uuid },
    });
  }
}
