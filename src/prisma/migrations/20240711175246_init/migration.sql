/*
  Warnings:

  - You are about to drop the column `sessions` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "sessions",
ADD COLUMN     "numSessions" INTEGER NOT NULL DEFAULT 0;
