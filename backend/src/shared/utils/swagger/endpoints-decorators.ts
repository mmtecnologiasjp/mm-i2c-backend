import {
  ApiCreatedResponse,
  ApiExtraModels,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Class, Options } from '.';

function ApiEndpoints({ tag, schemas }: { tag: string; schemas: Class[] }) {
  return function (target: Class) {
    ApiTags(tag)(target);
    ApiExtraModels(...schemas)(target);
  };
}

function ApiCreate({ Schema, options }: { Schema: Class; options?: Options }) {
  return function (target: any, key: string, descriptor: PropertyDescriptor) {
    ApiOperation({ summary: 'Create', ...options })(target, key, descriptor);
    ApiCreatedResponse({ type: Schema })(target, key, descriptor);
  };
}

function ApiGetOne({ Schema, options }: { Schema: Class; options?: Options }) {
  return function (target: any, key: string, descriptor: PropertyDescriptor) {
    ApiOperation({ summary: 'Get One', ...options })(target, key, descriptor);
    ApiOkResponse({
      type: Schema,
    })(target, key, descriptor);
  };
}

function ApiGetAll({ Schema, options }: { Schema: Class; options?: Options }) {
  return function (target: any, key: string, descriptor: PropertyDescriptor) {
    ApiOperation({ summary: 'Get All', ...options })(target, key, descriptor);
    ApiOkResponse({
      isArray: true,
      type: Schema,
    })(target, key, descriptor);
  };
}

function ApiUpdate({ Schema, options }: { Schema: Class; options?: Options }) {
  return function (target: any, key: string, descriptor: PropertyDescriptor) {
    ApiOperation({ summary: 'Update', ...options })(target, key, descriptor);
    ApiOkResponse({ type: Schema })(target, key, descriptor);
  };
}

function ApiSoftDelete({
  SoftDeletedSchema,
  options,
}: {
  SoftDeletedSchema: Class;
  options?: Options;
}) {
  return function (target: any, key: string, descriptor: PropertyDescriptor) {
    ApiOperation({ summary: 'Soft Delete', ...options })(
      target,
      key,
      descriptor,
    );
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
