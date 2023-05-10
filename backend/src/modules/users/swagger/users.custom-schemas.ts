import { ApiSoftDeletedAtField } from 'src/shared/utils/swagger/properties-decorators';
import { User } from '../entities/user.entity';

export class SoftDeletedUser extends User {
  @ApiSoftDeletedAtField()
  deleted_at: Date | null;
}
