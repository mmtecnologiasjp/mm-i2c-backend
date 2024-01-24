import { User } from 'src/modules/users/entities/user.entity';
import { ApiPropertyUUID } from 'src/shared/utils/swagger/properties-decorators';

export class PrivateConversationsUser extends User {
  @ApiPropertyUUID()
  private_conversation_uuid: string;
}
