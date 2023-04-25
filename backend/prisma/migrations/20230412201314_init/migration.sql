/*
  Warnings:

  - You are about to drop the column `sender_id` on the `Messages` table. All the data in the column will be lost.
  - Added the required column `receiver_uuid` to the `Messages` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sender_uuid` to the `Messages` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Messages" DROP CONSTRAINT "Messages_sender_id_fkey";

-- AlterTable
ALTER TABLE "Messages" DROP COLUMN "sender_id",
ADD COLUMN     "receiver_uuid" TEXT NOT NULL,
ADD COLUMN     "sender_uuid" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Messages" ADD CONSTRAINT "Messages_sender_uuid_fkey" FOREIGN KEY ("sender_uuid") REFERENCES "users"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Messages" ADD CONSTRAINT "Messages_receiver_uuid_fkey" FOREIGN KEY ("receiver_uuid") REFERENCES "users"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
