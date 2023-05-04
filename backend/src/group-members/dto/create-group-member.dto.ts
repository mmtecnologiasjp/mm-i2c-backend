import { RoleEnum } from '@prisma/client';
import {
  IsRequiredEnum,
  IsRequiredString,
} from 'src/utils/class-validator/decorators';

export class CreateGroupMemberDto {
  @IsRequiredString()
  readonly group_uuid: string;

  @IsRequiredString()
  readonly user_uuid: string;

  @IsRequiredEnum(RoleEnum)
  readonly role: RoleEnum;
}
