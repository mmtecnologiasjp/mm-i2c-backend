import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { SsoApiService } from '../sso-api/sso-api.service';
import { SsoMicroservicesApiService } from '../sso-microservices-api/sso-microservices-api.service';
import { Role } from './entities/role.entity';

@Injectable()
export class SsoService {
  constructor(
    private readonly ssoApiService: SsoApiService,
    private readonly ssoMicroservicesApiService: SsoMicroservicesApiService,
  ) {}

  createRole(createRoleDto: CreateRoleDto) {
    return this.ssoMicroservicesApiService.post<Role>('/roles', createRoleDto);
  }

  getUserInfo(accessToken: string) {
    return this.ssoApiService.get('/user', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }

  assignUserRole(userId: string, roleId: string) {
    return this.ssoMicroservicesApiService.put('/roles/assign-user-role', {
      userId,
      roleId,
    });
  }
}
