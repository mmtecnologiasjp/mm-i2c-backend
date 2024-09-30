// auth.service.ts
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcryptjs';
import authConfig from '../../config/auth';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    try {
      const user = await this.usersService.searchByEmail(email);
      if (user && (await bcrypt.compare(password, user.password))) {
        const { ...result } = user;
        return result;
      }
      return null;
    } catch (error) {
      return [];
    }
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload, {
        secret: authConfig.jwt.secret,
        expiresIn: authConfig.jwt.expiresIn,
      }),
    };
  }
}
