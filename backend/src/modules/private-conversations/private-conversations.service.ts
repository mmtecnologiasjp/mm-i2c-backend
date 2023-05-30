import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreatePrivateConversationDto } from './dto/create-private-conversation.dto';
import { Prisma } from '@prisma/client';
import prisma from '../../client';
import { User } from '../users/entities/user.entity';

@Injectable()
export class PrivateConversationsService {
  async create(createPrivateConversationDto: CreatePrivateConversationDto) {
    const createdPrivateConversation = await prisma.privateConversation.create({
      data: createPrivateConversationDto,
      select: { from: true, to: true, uuid: true },
    });

    return this._getOtherUserOnConversation(
      createdPrivateConversation,
      createPrivateConversationDto.from_uuid,
    );
  }

  async findAllByUserUUID(uuid: string) {
    const users = await prisma.privateConversation.findMany({
      where: { OR: [{ from_uuid: uuid }, { to_uuid: uuid }] },
      select: { from: true, to: true, uuid: true },
    });

    const otherUsersOnConversation = users.map((item) =>
      this._getOtherUserOnConversation(item, uuid),
    );

    return otherUsersOnConversation;
  }

  findOne(uuid: string) {
    return prisma.privateConversation.findUnique({
      where: { uuid },
      include: {
        messages: {
          include: {
            sender: true,
          },
        },
        tasks: true,
      },
    });
  }

  private _getOtherUserOnConversation(
    privateConversation: {
      from: User;
      to: User;
      uuid: string;
    },
    uuidSent: string,
  ) {
    const { from, to } = privateConversation;

    const userStartedConversation = from.uuid === uuidSent;

    if (userStartedConversation) {
      return {
        ...to,
        privateConversationUuid: privateConversation.uuid,
      };
    }

    return {
      ...from,
      privateConversationUuid: privateConversation.uuid,
    };
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
