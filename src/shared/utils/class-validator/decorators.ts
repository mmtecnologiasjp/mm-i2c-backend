import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  IsUUID,
  IsUrl,
  Validate,
} from 'class-validator';
import { FieldExists } from './validators/FieldExists';
import { Prisma } from '@prisma/client';

type UncapitalizedModelName = Uncapitalize<Prisma.ModelName>;

function IsRequiredString() {
  return function (object: Record<string, any>, propertyName: string) {
    IsString()(object, propertyName);
    IsNotEmpty()(object, propertyName);
  };
}

function IsRequiredEnum(Enum: object) {
  return function (object: Record<string, any>, propertyName: string) {
    IsEnum(Enum)(object, propertyName);
    IsNotEmpty()(object, propertyName);
  };
}

function IsRequiredUUID() {
  return function (object: Record<string, any>, propertyName: string) {
    IsUUID()(object, propertyName);
    IsNotEmpty()(object, propertyName);
  };
}

function IsRequiredEmail() {
  return function (object: Record<string, any>, propertyName: string) {
    IsEmail()(object, propertyName);
    IsNotEmpty()(object, propertyName);
  };
}

function IsRequiredURL() {
  return function (object: Record<string, any>, propertyName: string) {
    IsUrl()(object, propertyName);
    IsNotEmpty()(object, propertyName);
  };
}

function ValidateFieldExists(model: UncapitalizedModelName, field: string) {
  return function (object: Record<string, any>, propertyName: string) {
    Validate(FieldExists, [model, field])(object, propertyName);
  };
}

export {
  IsRequiredString,
  IsRequiredEnum,
  IsRequiredUUID,
  ValidateFieldExists,
  IsRequiredEmail,
  IsRequiredURL,
};
