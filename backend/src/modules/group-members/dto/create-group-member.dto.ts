import { RoleEnum } from '@prisma/client';
import {
  IsRequiredEnum,
  IsRequiredUUID,
  ValidateFieldExists,
} from 'src/shared/utils/class-validator/decorators';
import {
  ApiPropertyEnum,
  ApiPropertyUUID,
} from 'src/shared/utils/swagger/properties-decorators';

export class CreateGroupMemberDto {
  @IsRequiredUUID()
  @ApiPropertyUUID()
  @ValidateFieldExists('group', 'uuid')
  group_uuid: string;

  @IsRequiredUUID()
  @ApiPropertyUUID()
  @ValidateFieldExists('user', 'uuid')
  user_uuid: string;

  @IsRequiredEnum(RoleEnum)
  @ApiPropertyEnum({ Enum: RoleEnum, Default: RoleEnum.Admin })
  role: RoleEnum;
}
