/*
  Warnings:

  - You are about to drop the column `content` on the `messages` table. All the data in the column will be lost.
  - You are about to drop the column `group_id` on the `messages` table. All the data in the column will be lost.
  - You are about to drop the column `receiver_uuid` on the `messages` table. All the data in the column will be lost.
  - You are about to drop the column `sender_uuid` on the `messages` table. All the data in the column will be lost.
  - You are about to drop the column `timestamp` on the `messages` table. All the data in the column will be lost.
  - Added the required column `updated_at` to the `groups` table without a default value. This is not possible if the table is not empty.
  - Added the required column `group_uuid` to the `messages` table without a default value. This is not possible if the table is not empty.
  - Added the required column `owner_uuid` to the `messages` table without a default value. This is not possible if the table is not empty.
  - Added the required column `private_conversation_uuid` to the `messages` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `messages` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PriorityEnum" AS ENUM ('Urgent', 'High', 'Medium', 'Low', 'Lowest');

-- CreateEnum
CREATE TYPE "ContentTypeEnum" AS ENUM ('note', 'topic');

-- DropForeignKey
ALTER TABLE "messages" DROP CONSTRAINT "messages_group_id_fkey";

-- DropForeignKey
ALTER TABLE "messages" DROP CONSTRAINT "messages_receiver_uuid_fkey";

-- DropForeignKey
ALTER TABLE "messages" DROP CONSTRAINT "messages_sender_uuid_fkey";

-- AlterTable
ALTER TABLE "groups" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deleted_at" TIMESTAMP(3),
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "messages" DROP COLUMN "content",
DROP COLUMN "group_id",
DROP COLUMN "receiver_uuid",
DROP COLUMN "sender_uuid",
DROP COLUMN "timestamp",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deleted_at" TIMESTAMP(3),
ADD COLUMN     "group_uuid" TEXT NOT NULL,
ADD COLUMN     "owner_uuid" TEXT NOT NULL,
ADD COLUMN     "private_conversation_uuid" TEXT NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "private_conversations" (
    "uuid" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "private_conversations_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "private_conversation_members" (
    "uuid" TEXT NOT NULL,
    "conversation_uuid" TEXT NOT NULL,

    CONSTRAINT "private_conversation_members_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "tasks" (
    "uuid" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "priority" "PriorityEnum" NOT NULL,
    "sprint" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),
    "private_conversation_uuid" TEXT NOT NULL,
    "group_uuid" TEXT NOT NULL,
    "owner_uuid" TEXT NOT NULL,

    CONSTRAINT "tasks_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "tasks_assignees" (
    "uuid" TEXT NOT NULL,
    "task_uuid" TEXT NOT NULL,
    "user_uuid" TEXT NOT NULL,

    CONSTRAINT "tasks_assignees_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "contents" (
    "uuid" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "private_conversation_uuid" TEXT NOT NULL,
    "type" "ContentTypeEnum" NOT NULL,
    "group_uuid" TEXT NOT NULL,
    "owner_uuid" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "contents_pkey" PRIMARY KEY ("uuid")
);

-- AddForeignKey
ALTER TABLE "private_conversation_members" ADD CONSTRAINT "private_conversation_members_conversation_uuid_fkey" FOREIGN KEY ("conversation_uuid") REFERENCES "private_conversations"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_private_conversation_uuid_fkey" FOREIGN KEY ("private_conversation_uuid") REFERENCES "private_conversations"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_group_uuid_fkey" FOREIGN KEY ("group_uuid") REFERENCES "groups"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_owner_uuid_fkey" FOREIGN KEY ("owner_uuid") REFERENCES "users"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_private_conversation_uuid_fkey" FOREIGN KEY ("private_conversation_uuid") REFERENCES "private_conversations"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_group_uuid_fkey" FOREIGN KEY ("group_uuid") REFERENCES "groups"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_owner_uuid_fkey" FOREIGN KEY ("owner_uuid") REFERENCES "users"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tasks_assignees" ADD CONSTRAINT "tasks_assignees_task_uuid_fkey" FOREIGN KEY ("task_uuid") REFERENCES "tasks"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tasks_assignees" ADD CONSTRAINT "tasks_assignees_user_uuid_fkey" FOREIGN KEY ("user_uuid") REFERENCES "users"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contents" ADD CONSTRAINT "contents_private_conversation_uuid_fkey" FOREIGN KEY ("private_conversation_uuid") REFERENCES "private_conversations"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contents" ADD CONSTRAINT "contents_group_uuid_fkey" FOREIGN KEY ("group_uuid") REFERENCES "groups"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contents" ADD CONSTRAINT "contents_owner_uuid_fkey" FOREIGN KEY ("owner_uuid") REFERENCES "users"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
