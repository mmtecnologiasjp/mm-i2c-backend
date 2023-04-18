/*
  Warnings:

  - You are about to drop the `PrivateConversations` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "PrivateConversations" DROP CONSTRAINT "PrivateConversations_from_uuid_fkey";

-- DropForeignKey
ALTER TABLE "PrivateConversations" DROP CONSTRAINT "PrivateConversations_to_uuid_fkey";

-- DropForeignKey
ALTER TABLE "messages" DROP CONSTRAINT "messages_private_conversation_uuid_fkey";

-- DropTable
DROP TABLE "PrivateConversations";

-- CreateTable
CREATE TABLE "private_conversations" (
    "uuid" TEXT NOT NULL,
    "from_uuid" TEXT NOT NULL,
    "to_uuid" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "private_conversations_pkey" PRIMARY KEY ("uuid")
);

-- AddForeignKey
ALTER TABLE "private_conversations" ADD CONSTRAINT "private_conversations_from_uuid_fkey" FOREIGN KEY ("from_uuid") REFERENCES "users"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "private_conversations" ADD CONSTRAINT "private_conversations_to_uuid_fkey" FOREIGN KEY ("to_uuid") REFERENCES "users"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_private_conversation_uuid_fkey" FOREIGN KEY ("private_conversation_uuid") REFERENCES "private_conversations"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;
