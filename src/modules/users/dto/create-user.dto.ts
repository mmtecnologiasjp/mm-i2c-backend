import { StatusEnum } from '@prisma/client';
import { IsOptional, IsString, IsUUID } from 'class-validator';
import {
  IsRequiredEmail,
  IsRequiredEnum,
  IsRequiredString,
  IsRequiredUUID,
} from 'src/shared/utils/class-validator/decorators';
import {
  ApiPropertyEmail,
  ApiPropertyEnum,
  ApiPropertyLastName,
  ApiPropertyRequiredFirstName,
  ApiPropertyRequiredUUID,
} from 'src/shared/utils/swagger/properties-decorators';

export class CreateUserDto {
  @IsRequiredString()
  @ApiPropertyRequiredFirstName()
  first_name: string;

  @IsOptional()
  @IsString()
  @ApiPropertyLastName()
  last_name?: string;

  @IsRequiredString()
  @ApiPropertyRequiredFirstName()
  username: string;

  @IsRequiredEmail()
  @ApiPropertyEmail()
  email: string;

  @IsRequiredEnum(StatusEnum)
  @ApiPropertyEnum({ Default: StatusEnum.Active, Enum: StatusEnum })
  status: StatusEnum;

  @IsRequiredUUID()
  @ApiPropertyRequiredUUID()
  sso_uuid: string;
}
