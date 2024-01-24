import { Group as PrismaGroup } from '@prisma/client';
import {
  ApiPropertyDeletedAt,
  ApiPropertyDescription,
  ApiPropertyImageURL,
  ApiPropertyTimestamp,
  ApiPropertyUUID,
} from 'src/shared/utils/swagger/properties-decorators';

export class Group implements PrismaGroup {
  @ApiPropertyUUID()
  uuid: string;

  @ApiPropertyUUID()
  name: string;

  @ApiPropertyDescription()
  description: string | null;

  @ApiPropertyImageURL()
  image_url: string | null;

  @ApiPropertyUUID()
  creator_uuid: string;

  @ApiPropertyTimestamp()
  created_at: Date;

  @ApiPropertyTimestamp()
  updated_at: Date;

  @ApiPropertyDeletedAt()
  deleted_at: Date | null;
}
