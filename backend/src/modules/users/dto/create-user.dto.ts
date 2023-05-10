import { StatusEnum } from '@prisma/client';
import { IsString } from 'class-validator';
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
  ApiPropertyRequiredString,
} from 'src/shared/utils/swagger/properties-decorators';

export class CreateUserDto {
  @IsRequiredString()
  @ApiPropertyRequiredFirstName()
  first_name: string;

  @IsString()
  @ApiPropertyLastName()
  last_name: string;

  @IsRequiredString()
  @ApiPropertyRequiredFirstName()
  username: string;

  @IsRequiredEmail()
  @ApiPropertyEmail()
  email: string;

  @IsRequiredString()
  @ApiPropertyRequiredString()
  password: string;

  @IsRequiredEnum(StatusEnum)
  @ApiPropertyEnum({ Default: StatusEnum.Active, Enum: StatusEnum })
  status: StatusEnum;
}
