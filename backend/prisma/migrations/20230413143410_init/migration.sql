/*
  Warnings:

  - You are about to drop the column `creator_id` on the `groups` table. All the data in the column will be lost.
  - Added the required column `creator_uuid` to the `groups` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "groups" DROP CONSTRAINT "groups_creator_id_fkey";

-- AlterTable
ALTER TABLE "groups" DROP COLUMN "creator_id",
ADD COLUMN     "creator_uuid" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "groups" ADD CONSTRAINT "groups_creator_uuid_fkey" FOREIGN KEY ("creator_uuid") REFERENCES "users"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
