import { prismaMock } from '../prisma-mock';
import { FieldExists } from 'src/validators/FieldExists';

describe('FieldExists', () => {
  let fieldExists: FieldExists;

  beforeEach(() => {
    fieldExists = new FieldExists();
  });

  it('should return false if the field does not exists', async () => {
    prismaMock.user.findUnique.mockResolvedValue(null);
    const result = await fieldExists.validate('test', {
      constraints: ['user', 'uuid'],
    } as any);

    expect(result).toBe(false);
  });
});
