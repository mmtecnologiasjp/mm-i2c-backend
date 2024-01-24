/*
  Warnings:

  - Added the required column `role` to the `group_members` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "RoleEnum" AS ENUM ('Admin', 'Member');

-- AlterTable
ALTER TABLE "group_members" ADD COLUMN     "role" "RoleEnum" NOT NULL;
