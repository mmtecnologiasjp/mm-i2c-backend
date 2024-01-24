import { prismaMock } from '../prisma-mock';
import { FieldExists } from 'src/shared/utils/class-validator/validators/FieldExists';
import { generateUUID } from 'src/shared/utils/uuid/generateUUID';

describe('FieldExists', () => {
  let fieldExists: FieldExists;

  beforeEach(() => {
    fieldExists = new FieldExists();
  });

  it('should return false if the field does not exists', async () => {
    prismaMock.user.findUnique.mockResolvedValue(null);
    const result = await fieldExists.validate('test', {
      constraints: ['user', 'uuid'],
      value: generateUUID(),
      targetName: 'user',
      object: {},
      property: 'user_uuid',
    });

    expect(result).toBe(false);
  });
});
