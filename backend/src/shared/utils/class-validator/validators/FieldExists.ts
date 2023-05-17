import { Prisma } from '@prisma/client';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import prisma from 'src/client';

type UncapitalizedModelName = Uncapitalize<Prisma.ModelName>;
export type ValidationConstraints = [UncapitalizedModelName, string];

@ValidatorConstraint({ name: 'fieldExists', async: true })
export class FieldExists implements ValidatorConstraintInterface {
  async validate(value: string, args: ValidationArguments) {
    const [relatedModel, relatedField] = args.constraints;

    const relatedEntity = await prisma[relatedModel].findUnique({
      where: { [relatedField]: value },
      select: { uuid: true },
    });

    prisma.$disconnect();

    return !!relatedEntity;
  }

  defaultMessage(validationArguments?: ValidationArguments | undefined) {
    const [relatedModel, relatedField] = validationArguments?.constraints || [];
    const endsWithS = relatedModel.endsWith('s');
    const singularTableModel = endsWithS
      ? relatedModel.slice(0, -1)
      : relatedModel;
    const { value } = validationArguments ?? {};

    return `${singularTableModel} with this ${relatedField} ${value} does not exist`;
  }
}
