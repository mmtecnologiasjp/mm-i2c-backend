import { ApiProperty } from '@nestjs/swagger';
import { Group } from '../entities/group.entity';

export class SoftDeletedGroup extends Group {
  @ApiProperty({ nullable: true, default: new Date() })
  deleted_at: Date | null;
}
