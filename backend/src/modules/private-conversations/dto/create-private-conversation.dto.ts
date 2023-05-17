import {
  IsRequiredUUID,
  ValidateFieldExists,
} from 'src/shared/utils/class-validator/decorators';
import { ApiPropertyUUID } from 'src/shared/utils/swagger/properties-decorators';

export class CreatePrivateConversationDto {
  @ApiPropertyUUID()
  @IsRequiredUUID()
  @ValidateFieldExists('user', 'uuid')
  from_uuid: string;

  @ApiPropertyUUID()
  @ValidateFieldExists('user', 'uuid')
  to_uuid: string;
}
