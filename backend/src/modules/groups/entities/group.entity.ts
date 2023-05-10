import { ApiProperty } from '@nestjs/swagger';
import { faker } from '@faker-js/faker';
import { Group as PrismaGroup } from '@prisma/client';
import { generateUUID } from 'src/shared/utils/uuid/generateUUID';

export class Group implements PrismaGroup {
  @ApiProperty({ nullable: true, default: generateUUID() })
  uuid: string;

  @ApiProperty({ default: faker.company.name() })
  name: string;

  @ApiProperty({ nullable: true, default: faker.lorem.paragraph(1) })
  description: string | null;

  @ApiProperty({ nullable: true, default: faker.image.technics() })
  image_url: string | null;

  @ApiProperty({ default: generateUUID() })
  creator_uuid: string;

  @ApiProperty({ default: new Date() })
  created_at: Date;

  @ApiProperty({ default: new Date() })
  updated_at: Date;

  @ApiProperty({ nullable: true, default: null })
  deleted_at: Date | null;
}
