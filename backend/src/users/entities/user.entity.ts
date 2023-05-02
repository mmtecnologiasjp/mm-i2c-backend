import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';
import { User as PrismaUser, StatusEnum } from '@prisma/client';
import { generateUUID } from 'src/utils/uuid/generateUUID';

export class User implements PrismaUser {
  @ApiProperty({ default: generateUUID() })
  uuid: string;

  @ApiProperty({ default: faker.name.firstName() })
  first_name: string;

  @ApiProperty({ default: faker.name.lastName() })
  last_name: string | null;

  @ApiProperty({ default: faker.internet.userName() })
  username: string;

  @ApiProperty({ default: faker.internet.email() })
  email: string;

  @ApiProperty({ enum: StatusEnum, default: StatusEnum.Active })
  status: StatusEnum;

  @ApiProperty({ default: faker.internet.password() })
  password: string;

  @ApiProperty({ default: faker.image.imageUrl() })
  avatar_url: string | null;

  @ApiProperty({ default: new Date() })
  created_at: Date;

  @ApiProperty({ default: new Date() })
  updated_at: Date;

  @ApiProperty({ default: null })
  deleted_at: Date | null;
}
