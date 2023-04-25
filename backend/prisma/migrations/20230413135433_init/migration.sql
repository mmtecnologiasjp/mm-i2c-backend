-- AlterTable
ALTER TABLE "groups" ADD COLUMN     "image_url" TEXT;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "avatar_url" TEXT;

-- CreateTable
CREATE TABLE "images" (
    "uuid" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "private_conversation_uuid" TEXT NOT NULL,
    "group_uuid" TEXT NOT NULL,
    "owner_uuid" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "images_pkey" PRIMARY KEY ("uuid")
);

-- AddForeignKey
ALTER TABLE "images" ADD CONSTRAINT "images_private_conversation_uuid_fkey" FOREIGN KEY ("private_conversation_uuid") REFERENCES "private_conversations"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "images" ADD CONSTRAINT "images_group_uuid_fkey" FOREIGN KEY ("group_uuid") REFERENCES "groups"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "images" ADD CONSTRAINT "images_owner_uuid_fkey" FOREIGN KEY ("owner_uuid") REFERENCES "users"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
