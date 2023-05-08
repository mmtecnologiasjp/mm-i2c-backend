import { Group, GroupMember, User } from '@prisma/client';
import { user } from 'src/tests/users/mock/user.service.mock';
import { group } from '../../groups/mock/groups.service.mock';

const groupMemberUserMock: User = { ...user, uuid: '01' };

const groupMemberGroupMock: Group = { ...group, uuid: '01' };

const groupMemberMock: GroupMember = {
  group_uuid: '01',
  user_uuid: '01',
  uuid: '01',
  role: 'Admin',
  created_at: new Date(),
  updated_at: new Date(),
  deleted_at: null,
};

export { groupMemberGroupMock, groupMemberUserMock, groupMemberMock };
