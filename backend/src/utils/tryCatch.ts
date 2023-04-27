import { Prisma } from '@prisma/client';

type TryCatch<T> = Promise<
  [T, null] | [null, Error] | [null, Prisma.PrismaClientKnownRequestError]
>;

export const tryCatch = async <T>(promise: Promise<T>): TryCatch<T> => {
  try {
    const data = await promise;
    return [data, null];
  } catch (err) {
    return [null, err as Error | Prisma.PrismaClientKnownRequestError];
  }
};
