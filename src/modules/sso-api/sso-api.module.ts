import { HttpModule, HttpService } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { SsoApiService } from './sso-api.service';

@Module({
  imports: [
    HttpModule.register({
      baseURL: process.env.SSO_BASE_URL + '/api',
    }),
  ],
  providers: [
    {
      provide: SsoApiService,
      useExisting: HttpService,
    },
  ],
  exports: [SsoApiService],
})
export class SsoApiModule {}
