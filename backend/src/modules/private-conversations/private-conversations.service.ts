import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreatePrivateConversationDto } from './dto/create-private-conversation.dto';
import { tryCatch } from '../../shared/utils/tryCatch';
import { Prisma } from '@prisma/client';
import prisma from '../../client';

@Injectable()
export class PrivateConversationsService {
  async create(createPrivateConversationDto: CreatePrivateConversationDto) {
    const createPrivateConversationPromise = prisma.privateConversation.create({
      data: createPrivateConversationDto,
    });

    const [data, error] = await tryCatch(createPrivateConversationPromise);

    this._handleError(error);

    return data;
  }

  async findAllByUserUUID(uuid: string) {
    const users = await prisma.privateConversation.findMany({
      where: { OR: [{ from_uuid: uuid }, { to_uuid: uuid }] },
      select: { from: true, to: true },
    });

    const getOtherUserOnConversation = users.map((item) => {
      const { from, to } = item;

      if (from.uuid === uuid) {
        return to;
      }

      return from;
    });

    return getOtherUserOnConversation;
  }

  findOne(uuid: string) {
    return prisma.privateConversation.findUnique({
      where: { uuid },
      include: {
        messages: true,
        tasks: true,
      },
    });
  }

  private _handleError(
    error: Error | Prisma.PrismaClientKnownRequestError | null,
  ) {
    const isPrismaError = error instanceof Prisma.PrismaClientKnownRequestError;

    if (!isPrismaError && error !== null) {
      throw new InternalServerErrorException('Something went wrong');
    }
  }
}
