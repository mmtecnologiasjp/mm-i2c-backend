import { Group, GroupMember, User } from '@prisma/client';
import { userMock } from 'src/tests/users/mock/users.service.mock';
import { group } from '../../groups/mock/groups.service.mock';
import { CreateGroupMemberDto } from 'src/modules/group-members/dto/create-group-member.dto';
import { UpdateGroupMemberDto } from 'src/modules/group-members/dto/update-group-member.dto';

const groupMemberUserMock: User = { ...userMock, uuid: '01' };

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

const createGroupMemberInput: CreateGroupMemberDto = {
  group_uuid: '01',
  role: 'Admin',
  user_uuid: '01',
};

const updateGroupMemberInput: UpdateGroupMemberDto = {
  group_uuid: '01',
  role: 'Member',
  user_uuid: '01',
};

export {
  groupMemberGroupMock,
  groupMemberUserMock,
  groupMemberMock,
  updateGroupMemberInput,
  createGroupMemberInput,
};
