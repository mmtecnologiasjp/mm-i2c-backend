import { User } from '../entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

export class SoftDeletedUser extends User {
  @ApiProperty({ nullable: true, default: new Date() })
  deleted_at: Date | null;
}
