import { Group } from '@prisma/client';

const group: Group = {
  name: 'group1',
  description: 'description1',
  creator_uuid: '02',
  created_at: new Date(),
  deleted_at: null,
  image_url: '',
  updated_at: new Date(),
  uuid: '01',
};

const createGroupInput = {
  name: 'group1',
  description: 'description1',
  image_url: '',
  creator_uuid: '02',
};

export { group, createGroupInput };
