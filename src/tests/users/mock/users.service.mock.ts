import { faker } from '@faker-js/faker';
import { StatusEnum, User } from '@prisma/client';
import { CreateUserDto } from 'src/modules/users/dto/create-user.dto';
import { UpdateUserDto } from 'src/modules/users/dto/update-user.dto';
import { generateUUID } from 'src/shared/utils/uuid/generateUUID';

export const userMock: User = {
  uuid: generateUUID(),
  first_name: 'John',
  last_name: 'Doe',
  email: faker.internet.email(),
  avatar_url: faker.internet.avatar(),
  password: faker.internet.password(),
  status: StatusEnum.Active,
  username: 'johndoe',
  created_at: new Date(),
  updated_at: new Date(),
  deleted_at: null,
};

export const createUserInput: CreateUserDto = {
  first_name: 'John',
  last_name: 'Doe',
  email: faker.internet.email(),
  password: faker.internet.password(),
  status: StatusEnum.Active,
  username: 'johndoe',
};

export const updateUserInput: UpdateUserDto = {
  first_name: 'Jane',
  last_name: 'Doe',
  avatar_url: faker.internet.avatar(),
  email: '',
  password: '1234',
  status: StatusEnum.Active,
  username: 'jane',
};
