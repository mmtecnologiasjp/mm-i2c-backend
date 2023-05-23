import { Group } from '@prisma/client';
import { generateUUID } from '../../../shared/utils/uuid/generateUUID';

const group: Group = {
  name: 'group1',
  description: 'description1',
  creator_uuid: '02',
  created_at: new Date(),
  deleted_at: null,
  image_url: '',
  updated_at: new Date(),
  uuid: generateUUID(),
};

const createGroupInput = {
  name: 'group1',
  description: 'description1',
  image_url: '',
  creator_uuid: '01',
};

const updateGroupInput = {
  name: 'group 2',
  description: 'description 2',
  image_url: '',
  creator_uuid: '02',
};

export { group, createGroupInput, updateGroupInput };
