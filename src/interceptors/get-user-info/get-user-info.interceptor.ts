import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable, lastValueFrom } from 'rxjs';
import { SsoService } from 'src/modules/sso/sso.service';

@Injectable()
export class GetUserInfoInterceptor implements NestInterceptor {
  constructor(private readonly ssoService: SsoService) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();

    const accessToken = request.headers.authorization
      ?.replace('Bearer', '')
      .trim();

    if (accessToken) {
      try {
        const userInfo = await lastValueFrom(
          this.ssoService.getUserInfo(accessToken),
        );

        request.user = userInfo.data;
      } catch (e) {
        console.error(e);
        throw new UnauthorizedException();
      }
    }

    return next.handle();
  }
}
