import { Module } from '@nestjs/common';
import { SsoService } from './sso.service';
import { SsoApiModule } from '../sso-api/sso-api.module';

@Module({
  imports: [SsoApiModule],
  providers: [SsoService],
  exports: [SsoService],
})
export class SsoModule {}
