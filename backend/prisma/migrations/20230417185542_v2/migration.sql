/*
  Warnings:

  - You are about to drop the column `owner_uuid` on the `contents` table. All the data in the column will be lost.
  - You are about to drop the column `private_conversation_uuid` on the `contents` table. All the data in the column will be lost.
  - You are about to drop the column `owner_uuid` on the `messages` table. All the data in the column will be lost.
  - You are about to drop the column `private_conversation_uuid` on the `messages` table. All the data in the column will be lost.
  - You are about to drop the column `owner_uuid` on the `tasks` table. All the data in the column will be lost.
  - You are about to drop the column `private_conversation_uuid` on the `tasks` table. All the data in the column will be lost.
  - You are about to drop the `images` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `private_conversation_members` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `private_conversations` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `sender_uuid` to the `contents` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sender_uuid` to the `messages` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `messages` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sender_uuid` to the `tasks` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "MessageTypeEnum" AS ENUM ('text', 'image', 'video', 'audio', 'file', 'topic', 'note', 'task');

-- DropForeignKey
ALTER TABLE "contents" DROP CONSTRAINT "contents_owner_uuid_fkey";

-- DropForeignKey
ALTER TABLE "contents" DROP CONSTRAINT "contents_private_conversation_uuid_fkey";

-- DropForeignKey
ALTER TABLE "images" DROP CONSTRAINT "images_group_uuid_fkey";

-- DropForeignKey
ALTER TABLE "images" DROP CONSTRAINT "images_owner_uuid_fkey";

-- DropForeignKey
ALTER TABLE "images" DROP CONSTRAINT "images_private_conversation_uuid_fkey";

-- DropForeignKey
ALTER TABLE "messages" DROP CONSTRAINT "messages_owner_uuid_fkey";

-- DropForeignKey
ALTER TABLE "messages" DROP CONSTRAINT "messages_private_conversation_uuid_fkey";

-- DropForeignKey
ALTER TABLE "private_conversation_members" DROP CONSTRAINT "private_conversation_members_conversation_uuid_fkey";

-- DropForeignKey
ALTER TABLE "private_conversation_members" DROP CONSTRAINT "private_conversation_members_user_uuid_fkey";

-- DropForeignKey
ALTER TABLE "tasks" DROP CONSTRAINT "tasks_owner_uuid_fkey";

-- DropForeignKey
ALTER TABLE "tasks" DROP CONSTRAINT "tasks_private_conversation_uuid_fkey";

-- AlterTable
ALTER TABLE "contents" DROP COLUMN "owner_uuid",
DROP COLUMN "private_conversation_uuid",
ADD COLUMN     "receiver_uuid" TEXT,
ADD COLUMN     "sender_uuid" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "messages" DROP COLUMN "owner_uuid",
DROP COLUMN "private_conversation_uuid",
ADD COLUMN     "receiver_uuid" TEXT,
ADD COLUMN     "sender_uuid" TEXT NOT NULL,
ADD COLUMN     "type" "MessageTypeEnum" NOT NULL;

-- AlterTable
ALTER TABLE "tasks" DROP COLUMN "owner_uuid",
DROP COLUMN "private_conversation_uuid",
ADD COLUMN     "receiver_uuid" TEXT,
ADD COLUMN     "sender_uuid" TEXT NOT NULL;

-- DropTable
DROP TABLE "images";

-- DropTable
DROP TABLE "private_conversation_members";

-- DropTable
DROP TABLE "private_conversations";

-- CreateTable
CREATE TABLE "messages_metadata" (
    "uuid" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "message_uuid" TEXT NOT NULL,
    "user_uuid" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "messages_metadata_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "storage_files" (
    "uuid" TEXT NOT NULL,
    "filename" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "size_bytes" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "storage_files_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "storage_files_metadata" (
    "uuid" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "file_uuid" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "storage_files_metadata_pkey" PRIMARY KEY ("uuid")
);

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_sender_uuid_fkey" FOREIGN KEY ("sender_uuid") REFERENCES "users"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_receiver_uuid_fkey" FOREIGN KEY ("receiver_uuid") REFERENCES "users"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "messages_metadata" ADD CONSTRAINT "messages_metadata_message_uuid_fkey" FOREIGN KEY ("message_uuid") REFERENCES "messages"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "messages_metadata" ADD CONSTRAINT "messages_metadata_user_uuid_fkey" FOREIGN KEY ("user_uuid") REFERENCES "users"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "storage_files_metadata" ADD CONSTRAINT "storage_files_metadata_file_uuid_fkey" FOREIGN KEY ("file_uuid") REFERENCES "storage_files"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_sender_uuid_fkey" FOREIGN KEY ("sender_uuid") REFERENCES "users"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_receiver_uuid_fkey" FOREIGN KEY ("receiver_uuid") REFERENCES "users"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contents" ADD CONSTRAINT "contents_sender_uuid_fkey" FOREIGN KEY ("sender_uuid") REFERENCES "users"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contents" ADD CONSTRAINT "contents_receiver_uuid_fkey" FOREIGN KEY ("receiver_uuid") REFERENCES "users"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;
