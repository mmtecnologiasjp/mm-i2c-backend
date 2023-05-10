import { RoleEnum } from '@prisma/client';
import { Validate } from 'class-validator';
import {
  IsRequiredEnum,
  IsRequiredString,
} from 'src/shared/utils/class-validator/decorators';
import {
  FieldExists,
  ValidationConstraints,
} from 'src/shared/utils/class-validator/validators/FieldExists';
import {
  ApiPropertyEnum,
  ApiPropertyUUID,
} from 'src/shared/utils/swagger/dto-decorators';

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
