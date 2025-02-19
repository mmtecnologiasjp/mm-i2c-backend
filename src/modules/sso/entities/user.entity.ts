import { Role } from './role.entity';

export class User {
  id: string;

  email: string;

  emailVerifiedAt: string;

  name: string;

  createdAt: string;

  updatedAt: string;

  roles: Role[];
}
