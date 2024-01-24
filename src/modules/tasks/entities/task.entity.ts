import { PriorityEnum, Task as PrismaTask } from '@prisma/client';
import {
  ApiPropertyRequiredString,
  ApiPropertyDeletedAt,
  ApiPropertyEnum,
  ApiPropertyTimestamp,
  ApiPropertyUUID,
  ApiPropertyDescription,
  ApiPropertyString,
  ApiPropertyRequiredUUID,
} from 'src/shared/utils/swagger/properties-decorators';

export class Task implements PrismaTask {
  @ApiPropertyRequiredUUID()
  uuid: string;

  @ApiPropertyRequiredString()
  title: string;

  @ApiPropertyDescription()
  description: string;

  @ApiPropertyString()
  label: string;

  @ApiPropertyRequiredString()
  state: string;

  @ApiPropertyEnum({ Default: PriorityEnum.Medium, Enum: PriorityEnum })
  priority: PriorityEnum;

  @ApiPropertyString()
  sprint: string;

  @ApiPropertyUUID()
  group_uuid: string;

  @ApiPropertyUUID()
  private_conversation_uuid: string;

  @ApiPropertyRequiredUUID()
  sender_uuid: string;

  @ApiPropertyTimestamp()
  created_at: Date;

  @ApiPropertyTimestamp()
  updated_at: Date;

  @ApiPropertyDeletedAt()
  deleted_at: Date | null;
}
