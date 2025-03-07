import { StatusEnum } from '@prisma/client';
import { IsOptional, IsString, IsUUID } from 'class-validator';
import {
  IsRequiredEmail,
  IsRequiredEnum,
  IsRequiredString,
} from 'src/shared/utils/class-validator/decorators';
import {
  ApiPropertyEmail,
  ApiPropertyEnum,
  ApiPropertyLastName,
  ApiPropertyRequiredFirstName,
  ApiPropertyString,
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

  @IsOptional()
  @IsString()
  @ApiPropertyString()
  password?: string;

  @IsRequiredEnum(StatusEnum)
  @ApiPropertyEnum({ Default: StatusEnum.Active, Enum: StatusEnum })
  status: StatusEnum;

  @IsUUID()
  @ApiPropertyRequiredUUID()
  sso_uuid?: string;
}
