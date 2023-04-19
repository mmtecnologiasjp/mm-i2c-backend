-- DropForeignKey
ALTER TABLE "tasks" DROP CONSTRAINT "tasks_group_uuid_fkey";

-- DropForeignKey
ALTER TABLE "tasks" DROP CONSTRAINT "tasks_private_conversation_uuid_fkey";

-- AlterTable
ALTER TABLE "tasks" ALTER COLUMN "private_conversation_uuid" DROP NOT NULL,
ALTER COLUMN "group_uuid" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_private_conversation_uuid_fkey" FOREIGN KEY ("private_conversation_uuid") REFERENCES "private_conversations"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_group_uuid_fkey" FOREIGN KEY ("group_uuid") REFERENCES "groups"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;