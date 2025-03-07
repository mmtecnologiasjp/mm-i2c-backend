/*
  Warnings:

  - You are about to drop the column `sso_uid` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "sso_uid",
ADD COLUMN     "sso_uuid" TEXT;
