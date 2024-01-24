-- CreateEnum
CREATE TYPE "StatusEnum" AS ENUM ('Active', 'Inactive', 'Banned', 'Quarantine');

-- CreateEnum
CREATE TYPE "PriorityEnum" AS ENUM ('Urgent', 'High', 'Medium', 'Low', 'Lowest');

-- CreateEnum
CREATE TYPE "ContentTypeEnum" AS ENUM ('note', 'topic');

-- CreateEnum
CREATE TYPE "MessageTypeEnum" AS ENUM ('text', 'image', 'video', 'audio', 'file', 'topic', 'note', 'task');

-- CreateTable
CREATE TABLE "users" (
    "uuid" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "status" "StatusEnum" NOT NULL,
    "password" TEXT NOT NULL,
    "avatar_url" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "users_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "groups" (
    "uuid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "image_url" TEXT,
    "creator_uuid" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "groups_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "group_members" (
    "uuid" TEXT NOT NULL,
    "user_uuid" TEXT NOT NULL,
    "group_id" TEXT NOT NULL,

    CONSTRAINT "group_members_pkey" PRIMARY KEY ("uuid")
);

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

-- CreateTable
CREATE TABLE "messages" (
    "uuid" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "group_uuid" TEXT,
    "private_conversation_uuid" TEXT,
    "sender_uuid" TEXT NOT NULL,
    "type" "MessageTypeEnum" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "messages_pkey" PRIMARY KEY ("uuid")
);

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
    "group_uuid" TEXT,
    "private_conversation_uuid" TEXT,
    "sender_uuid" TEXT NOT NULL,

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
    "title" TEXT,
    "type" "ContentTypeEnum" NOT NULL,
    "group_uuid" TEXT,
    "sender_uuid" TEXT NOT NULL,
    "receiver_uuid" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "contents_pkey" PRIMARY KEY ("uuid")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "groups" ADD CONSTRAINT "groups_creator_uuid_fkey" FOREIGN KEY ("creator_uuid") REFERENCES "users"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "group_members" ADD CONSTRAINT "group_members_user_uuid_fkey" FOREIGN KEY ("user_uuid") REFERENCES "users"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "group_members" ADD CONSTRAINT "group_members_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "groups"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "private_conversations" ADD CONSTRAINT "private_conversations_from_uuid_fkey" FOREIGN KEY ("from_uuid") REFERENCES "users"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "private_conversations" ADD CONSTRAINT "private_conversations_to_uuid_fkey" FOREIGN KEY ("to_uuid") REFERENCES "users"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_group_uuid_fkey" FOREIGN KEY ("group_uuid") REFERENCES "groups"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_private_conversation_uuid_fkey" FOREIGN KEY ("private_conversation_uuid") REFERENCES "private_conversations"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_sender_uuid_fkey" FOREIGN KEY ("sender_uuid") REFERENCES "users"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "messages_metadata" ADD CONSTRAINT "messages_metadata_message_uuid_fkey" FOREIGN KEY ("message_uuid") REFERENCES "messages"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "messages_metadata" ADD CONSTRAINT "messages_metadata_user_uuid_fkey" FOREIGN KEY ("user_uuid") REFERENCES "users"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "storage_files_metadata" ADD CONSTRAINT "storage_files_metadata_file_uuid_fkey" FOREIGN KEY ("file_uuid") REFERENCES "storage_files"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_group_uuid_fkey" FOREIGN KEY ("group_uuid") REFERENCES "groups"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_private_conversation_uuid_fkey" FOREIGN KEY ("private_conversation_uuid") REFERENCES "private_conversations"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_sender_uuid_fkey" FOREIGN KEY ("sender_uuid") REFERENCES "users"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tasks_assignees" ADD CONSTRAINT "tasks_assignees_task_uuid_fkey" FOREIGN KEY ("task_uuid") REFERENCES "tasks"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tasks_assignees" ADD CONSTRAINT "tasks_assignees_user_uuid_fkey" FOREIGN KEY ("user_uuid") REFERENCES "users"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contents" ADD CONSTRAINT "contents_group_uuid_fkey" FOREIGN KEY ("group_uuid") REFERENCES "groups"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contents" ADD CONSTRAINT "contents_sender_uuid_fkey" FOREIGN KEY ("sender_uuid") REFERENCES "users"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contents" ADD CONSTRAINT "contents_receiver_uuid_fkey" FOREIGN KEY ("receiver_uuid") REFERENCES "users"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;
