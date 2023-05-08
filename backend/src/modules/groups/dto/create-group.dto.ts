import { IsNotEmpty, IsString, Validate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import {
  FieldExists,
  ValidationConstraints,
} from 'src/shared/utils/class-validator/validators/FieldExists';

export class CreateGroupDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ default: 'MM Communications' })
  name: string;

  @IsString()
  @ApiProperty({ nullable: true, default: 'MM Communications group' })
  description: string | null;

  @IsString()
  @ApiProperty({ nullable: true, default: 'https://i.imgur.com/2uVJj1a.png' })
  image_url: string | null;

  @IsString()
  @Validate(FieldExists, ['user', 'uuid'] as ValidationConstraints)
  @ApiProperty({ default: '02' })
  creator_uuid: string;
}
