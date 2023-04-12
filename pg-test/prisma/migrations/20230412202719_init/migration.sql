-- DropForeignKey
ALTER TABLE "messages" DROP CONSTRAINT "messages_receiver_uuid_fkey";

-- AlterTable
ALTER TABLE "messages" ALTER COLUMN "receiver_uuid" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_receiver_uuid_fkey" FOREIGN KEY ("receiver_uuid") REFERENCES "users"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;
