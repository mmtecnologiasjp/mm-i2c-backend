/*
  Warnings:

  - You are about to drop the column `receiver_uuid` on the `tasks` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "tasks" DROP CONSTRAINT "tasks_receiver_uuid_fkey";

-- AlterTable
ALTER TABLE "tasks" DROP COLUMN "receiver_uuid",
ADD COLUMN     "private_conversation_uuid" TEXT;

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_private_conversation_uuid_fkey" FOREIGN KEY ("private_conversation_uuid") REFERENCES "private_conversations"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;
