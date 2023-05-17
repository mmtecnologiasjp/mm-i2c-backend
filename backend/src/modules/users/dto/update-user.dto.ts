import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { IsUrl } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsUrl()
  avatar_url?: string;
}
