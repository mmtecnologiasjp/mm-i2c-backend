/*
  Warnings:

  - Added the required column `user_uuid` to the `private_conversation_members` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "private_conversation_members" ADD COLUMN     "user_uuid" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "private_conversation_members" ADD CONSTRAINT "private_conversation_members_user_uuid_fkey" FOREIGN KEY ("user_uuid") REFERENCES "users"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
