import { ApiProperty } from '@nestjs/swagger';
import { RoleEnum } from '@prisma/client';
import { Validate } from 'class-validator';
import {
  IsRequiredEnum,
  IsRequiredString,
} from 'src/utils/class-validator/decorators';
import { generateUUID } from 'src/utils/uuid/generateUUID';
import { FieldExists, ValidationConstraints } from 'src/validators/FieldExists';

export class CreateGroupMemberDto {
  @IsRequiredString()
  @ApiProperty({ default: generateUUID() })
  @Validate(FieldExists, ['group', 'uuid'] as ValidationConstraints)
  group_uuid: string;

  @IsRequiredString()
  @ApiProperty({ default: generateUUID() })
  @Validate(FieldExists, ['user', 'uuid'] as ValidationConstraints)
  user_uuid: string;

  @IsRequiredEnum(RoleEnum)
  @ApiProperty({ enum: RoleEnum })
  role: RoleEnum;
}
