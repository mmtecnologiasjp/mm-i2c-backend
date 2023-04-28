import { StatusEnum, User } from '@prisma/client';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';
import { v4 as uuidv4 } from 'uuid';

export const user: User = {
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

export const createUserInput: CreateUserDto = {
  uuid: uuidv4(),
  first_name: 'John',
  last_name: 'Doe',
  email: '',
  avatar_url: '',
  password: '123',
  status: StatusEnum.Active,
  username: 'johndoe',
};

export const updateUserInput: UpdateUserDto = {
  uuid: '02',
  first_name: 'Jane',
  last_name: 'Doe',
  avatar_url: '',
  email: '',
  password: '1234',
  status: StatusEnum.Active,
  username: 'jane',
};
