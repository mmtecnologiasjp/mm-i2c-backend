import { PrivateConversation as PrismaPrivateConversation } from '@prisma/client';
import {
  ApiPropertyDeletedAt,
  ApiPropertyTimestamp,
  ApiPropertyUUID,
} from 'src/shared/utils/swagger/properties-decorators';

export class PrivateConversation implements PrismaPrivateConversation {
  @ApiPropertyUUID()
  uuid: string;

  @ApiPropertyUUID()
  from_uuid: string;

  @ApiPropertyUUID()
  to_uuid: string;

  @ApiPropertyTimestamp()
  created_at: Date;

  @ApiPropertyTimestamp()
  updated_at: Date;

  @ApiPropertyDeletedAt()
  deleted_at: Date | null;
}
