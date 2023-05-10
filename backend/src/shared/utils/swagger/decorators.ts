import {
  ApiCreatedResponse,
  ApiExtraModels,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Class } from '.';

function ApiEndpoints({ tag, shemas }: { tag: string; shemas: Class[] }) {
  return function (target: Class) {
    ApiTags(tag)(target);
    ApiExtraModels(...shemas)(target);
  };
}

function ApiCreate({ Schema }: { Schema: Class }) {
  return function (target: any, key: string, descriptor: PropertyDescriptor) {
    ApiOperation({ summary: 'Create' })(target, key, descriptor);
    ApiCreatedResponse({ type: Schema })(target, key, descriptor);
  };
}

function ApiGetOne({ Schema }: { Schema: Class }) {
  return function (target: any, key: string, descriptor: PropertyDescriptor) {
    ApiOperation({ summary: 'Get One' })(target, key, descriptor);
    ApiOkResponse({
      type: Schema,
    })(target, key, descriptor);
  };
}

function ApiGetAll({ Schema }: { Schema: Class }) {
  return function (target: any, key: string, descriptor: PropertyDescriptor) {
    ApiOperation({ summary: `Get All` })(target, key, descriptor);
    ApiOkResponse({
      isArray: true,
      type: Schema,
    })(target, key, descriptor);
  };
}

function ApiUpdate({ Schema }: { Schema: Class }) {
  return function (target: any, key: string, descriptor: PropertyDescriptor) {
    ApiOperation({ summary: 'Update' })(target, key, descriptor);
    ApiOkResponse({ type: Schema })(target, key, descriptor);
  };
}

function ApiSoftDelete({ SoftDeletedSchema }: { SoftDeletedSchema: Class }) {
  return function (target: any, key: string, descriptor: PropertyDescriptor) {
    ApiOperation({ summary: 'Soft Delete' })(target, key, descriptor);
    ApiOkResponse({ type: SoftDeletedSchema })(target, key, descriptor);
  };
}

export {
  ApiCreate,
  ApiEndpoints,
  ApiGetOne,
  ApiGetAll,
  ApiUpdate,
  ApiSoftDelete,
};
