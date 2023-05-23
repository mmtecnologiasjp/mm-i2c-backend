import { PriorityEnum } from '@prisma/client';
import { IsOptional, IsString, IsUUID } from 'class-validator';
import {
  IsRequiredEnum,
  IsRequiredString,
  IsRequiredUUID,
  ValidateFieldExists,
} from 'src/shared/utils/class-validator/decorators';
import {
  ApiPropertyDescription,
  ApiPropertyEnum,
  ApiPropertyString,
  ApiPropertyUUID,
} from 'src/shared/utils/swagger/properties-decorators';

export class CreateTaskDto {
  @IsRequiredString()
  @ApiPropertyString()
  title: string;

  @IsString()
  @ApiPropertyDescription()
  description?: string;

  @IsString()
  @ApiPropertyString()
  label?: string;

  @IsRequiredString()
  @ApiPropertyString()
  state: string;

  @IsRequiredEnum(PriorityEnum)
  @ApiPropertyEnum({ Default: PriorityEnum.Medium, Enum: PriorityEnum })
  priority: PriorityEnum;

  @IsString()
  @ApiPropertyString()
  sprint?: string;

  @IsUUID()
  @ValidateFieldExists('group', 'uuid')
  @ApiPropertyUUID()
  @IsOptional()
  group_uuid?: string;

  @IsUUID()
  @ValidateFieldExists('privateConversation', 'uuid')
  @ApiPropertyUUID()
  @IsOptional()
  private_conversation_uuid?: string;

  @IsRequiredUUID()
  @ValidateFieldExists('user', 'uuid')
  @ApiPropertyUUID()
  sender_uuid: string;
}
