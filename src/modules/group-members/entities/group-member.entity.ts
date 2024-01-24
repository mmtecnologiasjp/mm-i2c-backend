import { GroupMember as PrismaGroupMember, RoleEnum } from '@prisma/client';
import {
  ApiPropertyDeletedAt,
  ApiPropertyEnum,
  ApiPropertyTimestamp,
  ApiPropertyUUID,
} from 'src/shared/utils/swagger/properties-decorators';

export class GroupMember implements PrismaGroupMember {
  @ApiPropertyUUID()
  uuid: string;

  @ApiPropertyUUID()
  user_uuid: string;

  @ApiPropertyUUID()
  group_uuid: string;

  @ApiPropertyEnum({ Enum: RoleEnum, Default: RoleEnum.Admin })
  role: RoleEnum;

  @ApiPropertyTimestamp()
  created_at: Date;

  @ApiPropertyTimestamp()
  updated_at: Date;

  @ApiPropertyDeletedAt()
  deleted_at: Date | null;
}
