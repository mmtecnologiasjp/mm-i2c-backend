import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

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

export { IsRequiredString, IsRequiredEnum };
