/*
  Warnings:

  - You are about to drop the `Messages` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Messages" DROP CONSTRAINT "Messages_group_id_fkey";

-- DropForeignKey
ALTER TABLE "Messages" DROP CONSTRAINT "Messages_receiver_uuid_fkey";

-- DropForeignKey
ALTER TABLE "Messages" DROP CONSTRAINT "Messages_sender_uuid_fkey";

-- DropTable
DROP TABLE "Messages";

-- CreateTable
CREATE TABLE "messages" (
    "uuid" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "sender_uuid" TEXT NOT NULL,
    "receiver_uuid" TEXT NOT NULL,
    "group_id" TEXT,
    "receiver_id" TEXT NOT NULL,

    CONSTRAINT "messages_pkey" PRIMARY KEY ("uuid")
);

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_sender_uuid_fkey" FOREIGN KEY ("sender_uuid") REFERENCES "users"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_receiver_uuid_fkey" FOREIGN KEY ("receiver_uuid") REFERENCES "users"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "groups"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;
