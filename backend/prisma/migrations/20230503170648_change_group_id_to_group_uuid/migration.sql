/*
  Warnings:

  - You are about to drop the column `group_id` on the `group_members` table. All the data in the column will be lost.
  - The required column `group_uuid` was added to the `group_members` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE "group_members" DROP CONSTRAINT "group_members_group_id_fkey";

-- AlterTable
ALTER TABLE "group_members" DROP COLUMN "group_id",
ADD COLUMN     "group_uuid" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "group_members" ADD CONSTRAINT "group_members_group_uuid_fkey" FOREIGN KEY ("group_uuid") REFERENCES "groups"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
