import { User as PrismaUser, StatusEnum } from '@prisma/client';
import {
  ApiPropertyDeletedAt,
  ApiPropertyEmail,
  ApiPropertyEnum,
  ApiPropertyImageURL,
  ApiPropertyLastName,
  ApiPropertyRequiredFirstName,
  ApiPropertyRequiredString,
  ApiPropertyTimestamp,
  ApiPropertyUUID,
} from 'src/shared/utils/swagger/properties-decorators';

export class User implements PrismaUser {
  @ApiPropertyUUID()
  uuid: string;

  @ApiPropertyRequiredFirstName()
  first_name: string;

  @ApiPropertyLastName()
  last_name: string | null;

  @ApiPropertyRequiredString()
  username: string;

  @ApiPropertyEmail()
  email: string;

  @ApiPropertyEnum({ Default: StatusEnum.Active, Enum: StatusEnum })
  status: StatusEnum;

  @ApiPropertyRequiredString()
  password: string;

  @ApiPropertyImageURL()
  avatar_url: string | null;

  @ApiPropertyTimestamp()
  created_at: Date;

  @ApiPropertyTimestamp()
  updated_at: Date;

  @ApiPropertyDeletedAt()
  deleted_at: Date | null;
}
