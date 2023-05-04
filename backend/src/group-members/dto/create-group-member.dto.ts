import { ApiProperty } from '@nestjs/swagger';
import { RoleEnum } from '@prisma/client';
import {
  IsRequiredEnum,
  IsRequiredString,
} from 'src/utils/class-validator/decorators';
import { generateUUID } from 'src/utils/uuid/generateUUID';

export class CreateGroupMemberDto {
  @IsRequiredString()
  @ApiProperty({ default: generateUUID() })
  readonly group_uuid: string;

  @IsRequiredString()
  @ApiProperty({ default: generateUUID() })
  readonly user_uuid: string;

  @IsRequiredEnum(RoleEnum)
  @ApiProperty({ enum: RoleEnum })
  readonly role: RoleEnum;
}
