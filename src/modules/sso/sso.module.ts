import { Module } from '@nestjs/common';
import { SsoService } from './sso.service';
import { SsoApiModule } from '../sso-api/sso-api.module';
import { SsoMicroservicesApiModule } from '../sso-microservices-api/sso-microservices-api.module';

@Module({
  imports: [SsoApiModule, SsoMicroservicesApiModule],
  providers: [SsoService],
  exports: [SsoService],
})
export class SsoModule {}
