import { ApiProperty, ApiPropertyOptions } from '@nestjs/swagger';
import { generateUUID } from '../uuid/generateUUID';

export function ApiPropertyUUID(
  options?: ApiPropertyOptions,
): PropertyDecorator {
  return function (target: object, propertyKey: string | symbol) {
    ApiProperty({ nullable: true, default: generateUUID(), ...options })(
      target,
      propertyKey,
    );
  };
}

export function ApiPropertyEnum({
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

export function ApiPropertyTimestamp(): PropertyDecorator {
  return function (target: object, propertyKey: string | symbol) {
    ApiProperty({
      nullable: true,
      type: 'string',
      format: 'date-time',
      default: new Date(),
    })(target, propertyKey);
  };
}

export function ApiPropertyDeletedAt() {
  return function (target: object, propertyKey: string | symbol) {
    ApiProperty({
      nullable: true,
      type: 'string',
      format: 'date-time',
      default: null,
    })(target, propertyKey);
  };
}
