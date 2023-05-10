import { Group } from '../entities/group.entity';
import { ApiSoftDeletedAtField } from 'src/shared/utils/swagger/properties-decorators';

export class SoftDeletedGroup extends Group {
  @ApiSoftDeletedAtField()
  deleted_at: Date | null;
}
