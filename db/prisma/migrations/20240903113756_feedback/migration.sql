/*
  Warnings:

  - Added the required column `feedback` to the `UserAnswer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserAnswer" ADD COLUMN     "feedback" TEXT NOT NULL;
