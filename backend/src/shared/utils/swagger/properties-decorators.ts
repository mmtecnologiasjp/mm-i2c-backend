import { ApiProperty, ApiPropertyOptions } from '@nestjs/swagger';
import { generateUUID } from '../uuid/generateUUID';
import { faker } from '@faker-js/faker';

function ApiPropertyUUID(options?: ApiPropertyOptions): PropertyDecorator {
  return function (target: object, propertyKey: string | symbol) {
    ApiProperty({
      nullable: true,
      default: generateUUID(),
      type: String,
      ...options,
    })(target, propertyKey);
  };
}

function ApiPropertyRequiredUUID(
  options?: ApiPropertyOptions,
): PropertyDecorator {
  return function (target: object, propertyKey: string | symbol) {
    ApiProperty({
      nullable: false,
      default: generateUUID(),
      type: String,
      ...options,
    })(target, propertyKey);
  };
}

function ApiPropertyString() {
  return function (target: object, propertyKey: string | symbol) {
    ApiProperty({
      nullable: true,
      default: faker.lorem.word({ length: 12 }),
      type: String,
    })(target, propertyKey);
  };
}

function ApiPropertyRequiredString() {
  return function (target: object, propertyKey: string | symbol) {
    ApiProperty({
      nullable: false,
      default: faker.lorem.word({ length: 12 }),
      type: String,
    })(target, propertyKey);
  };
}

function ApiPropertyEnum({
  Enum,
  Default,
}: {
  Enum: object;
  Default: string;
}): PropertyDecorator {
  return function (target: object, propertyKey: string | symbol) {
    ApiProperty({ nullable: true, enum: Enum, default: Default })(
      target,
      propertyKey,
    );
  };
}

function ApiPropertyTimestamp(): PropertyDecorator {
  return function (target: object, propertyKey: string | symbol) {
    ApiProperty({
      nullable: false,
      type: String,
      format: 'date-time',
      default: new Date(),
    })(target, propertyKey);
  };
}

function ApiPropertyDeletedAt() {
  return function (target: object, propertyKey: string | symbol) {
    ApiProperty({
      nullable: true,
      type: Date,
      format: 'date-time',
      default: null,
    })(target, propertyKey);
  };
}

function ApiSoftDeletedAtField() {
  return function (target: object, propertyKey: string | symbol) {
    ApiProperty({
      nullable: false,
      type: Date,
      format: 'date-time',
      default: new Date(),
    })(target, propertyKey);
  };
}

function ApiPropertyRequiredFirstName() {
  return function (target: object, propertyKey: string | symbol) {
    ApiProperty({
      nullable: false,
      type: String,
      default: faker.name.firstName(),
    })(target, propertyKey);
  };
}

function ApiPropertyLastName() {
  return function (target: object, propertyKey: string | symbol) {
    ApiProperty({
      nullable: true,
      type: String,
      default: faker.name.lastName(),
    })(target, propertyKey);
  };
}

function ApiPropertyDescription() {
  return function (target: object, propertyKey: string | symbol) {
    ApiProperty({
      nullable: true,
      type: String,
      default: faker.lorem.paragraph(),
    })(target, propertyKey);
  };
}

function ApiPropertyImageURL() {
  return function (target: object, propertyKey: string | symbol) {
    ApiProperty({
      nullable: true,
      type: String,
      default: faker.image.imageUrl(),
    })(target, propertyKey);
  };
}

function ApiPropertyEmail() {
  return function (target: object, propertyKey: string | symbol) {
    ApiProperty({
      nullable: false,
      type: String,
      default: faker.internet.email(),
    })(target, propertyKey);
  };
}

export {
  ApiPropertyRequiredFirstName,
  ApiPropertyDeletedAt,
  ApiPropertyTimestamp,
  ApiPropertyEnum,
  ApiPropertyUUID,
  ApiPropertyRequiredUUID,
  ApiPropertyLastName,
  ApiPropertyDescription,
  ApiPropertyImageURL,
  ApiPropertyString,
  ApiPropertyRequiredString,
  ApiPropertyEmail,
  ApiSoftDeletedAtField,
};
