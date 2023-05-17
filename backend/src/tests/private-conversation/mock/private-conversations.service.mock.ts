import { PrivateConversation, User } from '@prisma/client';
import { CreatePrivateConversationDto } from 'src/modules/private-conversations/dto/create-private-conversation.dto';
import { generateUUID } from 'src/shared/utils/uuid/generateUUID';
import { userMock } from 'src/tests/users/mock/users.service.mock';

const privateConversationFromUserMock: User = {
  ...userMock,
  uuid: generateUUID(),
};

const privateConversationMock: PrivateConversation = {
  uuid: generateUUID(),
  from_uuid: generateUUID(),
  to_uuid: generateUUID(),
  created_at: new Date(),
  updated_at: new Date(),
  deleted_at: null,
};

const createPrivateConversationInput: CreatePrivateConversationDto = {
  from_uuid: generateUUID(),
  to_uuid: generateUUID(),
};

export {
  privateConversationMock,
  createPrivateConversationInput,
  privateConversationFromUserMock,
};
