import { MessageTypeEnum, Message as PrismaMessage } from '@prisma/client';
import { IsRequiredEnum } from 'src/shared/utils/class-validator/decorators';
import {
  ApiPropertyDeletedAt,
  ApiPropertyDescription,
  ApiPropertyTimestamp,
  ApiPropertyUUID,
} from 'src/shared/utils/swagger/properties-decorators';

export class Message implements PrismaMessage {
  @ApiPropertyUUID()
  uuid: string;

  @ApiPropertyDescription()
  content: string;

  @ApiPropertyUUID({ nullable: true })
  group_uuid: string | null;

  @ApiPropertyUUID({ nullable: true })
  private_conversation_uuid: string | null;

  @ApiPropertyUUID()
  sender_uuid: string;

  @IsRequiredEnum(MessageTypeEnum)
  type: MessageTypeEnum;

  @ApiPropertyTimestamp()
  created_at: Date;

  @ApiPropertyTimestamp()
  updated_at: Date;

  @ApiPropertyDeletedAt()
  deleted_at: Date | null;
}
