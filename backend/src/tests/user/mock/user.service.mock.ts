import { Users, StatusEnum } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

export const user: Users = {
  uuid: uuidv4(),
  first_name: 'John',
  last_name: 'Doe',
  email: '',
  avatar_url: '',
  password: '123',
  status: StatusEnum.Active,
  username: 'johndoe',
  created_at: new Date(),
  updated_at: new Date(),
  deleted_at: null,
};
