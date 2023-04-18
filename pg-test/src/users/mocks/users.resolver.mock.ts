import { User } from '@prisma/client';

export const userMock: User = {
  username: 'ChristoferMendes',
  first_name: 'Christofer',
  last_name: 'Mendes',
  email: 'christoferluizdsm@gmail.com',
  password: 'chris123',
  uuid: '123',
  created_at: new Date(),
  updated_at: new Date(),
  deleted_at: new Date(),
  avatar_url: '',
  status: 'Active',
};
