import { OperationObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

export type Class = { new (...args: any[]): any };

export type Options = Partial<OperationObject>;
