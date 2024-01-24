import { IsString } from 'class-validator';
import {
  IsRequiredString,
  IsRequiredUUID,
  ValidateFieldExists,
} from 'src/shared/utils/class-validator/decorators';
import {
  ApiPropertyDescription,
  ApiPropertyImageURL,
  ApiPropertyRequiredFirstName,
  ApiPropertyUUID,
} from 'src/shared/utils/swagger/properties-decorators';

export class CreateGroupDto {
  @IsRequiredString()
  @ApiPropertyRequiredFirstName()
  name: string;

  @IsString()
  @ApiPropertyDescription()
  description: string | null;

  @IsString()
  @ApiPropertyImageURL()
  image_url: string | null;

  @IsRequiredUUID()
  @ApiPropertyUUID()
  @ValidateFieldExists('user', 'uuid')
  creator_uuid: string;
}
