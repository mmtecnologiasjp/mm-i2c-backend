import { faker } from '@faker-js/faker';
import { Message, MessageTypeEnum } from '@prisma/client';
import { CreateMessageDto } from 'src/modules/messages/dto/create-message.dto';
import { UpdateMessageDto } from 'src/modules/messages/dto/update-message.dto';
import { generateUUID } from 'src/shared/utils/uuid/generateUUID';

const uuid = generateUUID();
const group_uuid = generateUUID();
const private_conversation_uuid = generateUUID();
const sender_uuid = generateUUID();

const messageMock: Message = {
  uuid,
  content: faker.lorem.sentence(),
  type: MessageTypeEnum.text,
  created_at: new Date(),
  updated_at: new Date(),
  deleted_at: null,
  group_uuid,
  private_conversation_uuid,
  sender_uuid,
};

const createMessageInput: CreateMessageDto = {
  content: faker.lorem.sentence(),
  group_uuid,
  private_conversation_uuid,
  sender_uuid,
  type: MessageTypeEnum.text,
};

const updateMessageInput: UpdateMessageDto = {
  content: faker.lorem.sentence(),
  group_uuid,
  private_conversation_uuid,
  sender_uuid,
  type: MessageTypeEnum.text,
};

const messageMockDeleted = {
  ...messageMock,
  deleted_at: new Date(),
};

export {
  messageMock,
  createMessageInput,
  updateMessageInput,
  messageMockDeleted,
};
