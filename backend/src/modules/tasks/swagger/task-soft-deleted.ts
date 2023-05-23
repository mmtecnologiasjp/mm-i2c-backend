import { ApiSoftDeletedAtField } from 'src/shared/utils/swagger/properties-decorators';
import { Task } from '../entities/task.entity';

export class SoftDeletedTask extends Task {
  @ApiSoftDeletedAtField()
  deleted_at: Date | null;
}
