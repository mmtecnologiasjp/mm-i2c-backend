/*
  Warnings:

  - You are about to drop the column `receiver_uuid` on the `messages` table. All the data in the column will be lost.
  - You are about to drop the column `sender_uuid` on the `messages` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "messages" DROP CONSTRAINT "messages_receiver_uuid_fkey";

-- DropForeignKey
ALTER TABLE "messages" DROP CONSTRAINT "messages_sender_uuid_fkey";

-- AlterTable
ALTER TABLE "messages" DROP COLUMN "receiver_uuid",
DROP COLUMN "sender_uuid",
ADD COLUMN     "private_conversation_uuid" TEXT;

-- CreateTable
CREATE TABLE "PrivateConversations" (
    "uuid" TEXT NOT NULL,
    "from_uuid" TEXT NOT NULL,
    "to_uuid" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "PrivateConversations_pkey" PRIMARY KEY ("uuid")
);

-- AddForeignKey
ALTER TABLE "PrivateConversations" ADD CONSTRAINT "PrivateConversations_from_uuid_fkey" FOREIGN KEY ("from_uuid") REFERENCES "users"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PrivateConversations" ADD CONSTRAINT "PrivateConversations_to_uuid_fkey" FOREIGN KEY ("to_uuid") REFERENCES "users"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_private_conversation_uuid_fkey" FOREIGN KEY ("private_conversation_uuid") REFERENCES "PrivateConversations"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;
