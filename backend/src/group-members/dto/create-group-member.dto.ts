import { RoleEnum } from '@prisma/client';
import { Validate } from 'class-validator';
import {
  IsRequiredEnum,
  IsRequiredString,
} from 'src/utils/class-validator/decorators';
import {
  ApiPropertyEnum,
  ApiPropertyUUID,
} from 'src/utils/swagger/dto-decorators';
import { FieldExists, ValidationConstraints } from 'src/validators/FieldExists';

export class CreateGroupMemberDto {
  @IsRequiredString()
  @ApiPropertyUUID()
  @Validate(FieldExists, ['group', 'uuid'] as ValidationConstraints)
  group_uuid: string;

  @IsRequiredString()
  @ApiPropertyUUID()
  @Validate(FieldExists, ['user', 'uuid'] as ValidationConstraints)
  user_uuid: string;

  @IsRequiredEnum(RoleEnum)
  @ApiPropertyEnum({ Enum: RoleEnum, Default: RoleEnum.Admin })
  role: RoleEnum;
}
