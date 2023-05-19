import { Message } from '../../entities/message.entity';
import { ApiSoftDeletedAtField } from 'src/shared/utils/swagger/properties-decorators';

export class MessageSoftDeleted extends Message {
  @ApiSoftDeletedAtField()
  deleted_at: Date;
}
