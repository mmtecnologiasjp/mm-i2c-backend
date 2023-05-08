import { ApiProperty } from '@nestjs/swagger';
import { GroupMember } from '../entities/group-member.entity';

export class SoftDeletedGroupMember extends GroupMember {
  @ApiProperty({ nullable: true, default: new Date() })
  deleted_at: Date | null;
}
