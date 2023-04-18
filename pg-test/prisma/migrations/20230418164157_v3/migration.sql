/*
  Warnings:

  - Added the required column `sender_uuid` to the `messages` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "messages" ADD COLUMN     "sender_uuid" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_sender_uuid_fkey" FOREIGN KEY ("sender_uuid") REFERENCES "users"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
