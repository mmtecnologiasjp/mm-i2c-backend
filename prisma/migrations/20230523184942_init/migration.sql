-- AlterTable
ALTER TABLE "tasks" ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "label" DROP NOT NULL,
ALTER COLUMN "sprint" DROP NOT NULL;
