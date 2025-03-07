/*
  Warnings:

  - You are about to drop the column `sso_id` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "sso_id",
ADD COLUMN     "sso_uid" TEXT;
