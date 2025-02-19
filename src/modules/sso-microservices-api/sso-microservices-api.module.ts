import { Module } from '@nestjs/common';
import { SsoMicroservicesApiService } from './sso-microservices-api.service';
import { HttpModule, HttpService } from '@nestjs/axios';

@Module({
  imports: [
    HttpModule.register({
      baseURL: process.env.SSO_BASE_URL + '/api/v1/microservices',
      params: {
        token: process.env.TOKEN_INTEGRATION_MICROSERVICE,
      },
    }),
  ],
  providers: [
    {
      provide: SsoMicroservicesApiService,
      useExisting: HttpService,
    },
  ],
  exports: [SsoMicroservicesApiService],
})
export class SsoMicroservicesApiModule {}
