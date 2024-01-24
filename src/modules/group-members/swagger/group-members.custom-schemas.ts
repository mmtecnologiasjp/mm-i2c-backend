import { GroupMember } from '../entities/group-member.entity';
import { ApiSoftDeletedAtField } from 'src/shared/utils/swagger/properties-decorators';

export class SoftDeletedGroupMember extends GroupMember {
  @ApiSoftDeletedAtField()
  deleted_at: Date | null;
}
