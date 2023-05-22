import { MessageTypeEnum } from '@prisma/client';
import { IsOptional, IsUUID } from 'class-validator';
import {
  IsRequiredEnum,
  IsRequiredString,
  IsRequiredUUID,
  ValidateFieldExists,
} from 'src/shared/utils/class-validator/decorators';
import {
  ApiPropertyDescription,
  ApiPropertyRequiredEnum,
  ApiPropertyRequiredUUID,
  ApiPropertyUUID,
} from 'src/shared/utils/swagger/properties-decorators';

export class CreateMessageDto {
  @ApiPropertyDescription()
  @IsRequiredString()
  content: string;

  @ApiPropertyUUID()
  @IsUUID()
  @IsOptional()
  @ValidateFieldExists('group', 'uuid')
  group_uuid: string | null;

  @ApiPropertyUUID()
  @IsOptional()
  @IsUUID()
  @ValidateFieldExists('privateConversation', 'uuid')
  private_conversation_uuid: string | null;

  @ApiPropertyRequiredUUID()
  @IsRequiredUUID()
  @ValidateFieldExists('user', 'uuid')
  sender_uuid: string;

  @ApiPropertyRequiredEnum({
    Enum: MessageTypeEnum,
    Default: MessageTypeEnum.text,
  })
  @IsRequiredEnum(MessageTypeEnum)
  type: MessageTypeEnum;
}
