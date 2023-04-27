import { IsNotEmpty, IsString, Validate } from 'class-validator';
import { ValidationConstraints, FieldExists } from 'src/validators/FieldExists';

export class CreateGroupDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  description: string | null;

  @IsString()
  image_url: string | null;

  @IsString()
  @Validate(FieldExists, ['user', 'uuid'] as ValidationConstraints)
  creator_uuid: string;
}
