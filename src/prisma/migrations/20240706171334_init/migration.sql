/*
  Warnings:

  - A unique constraint covering the columns `[fileId]` on the table `Node` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Node" ADD COLUMN     "fileId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "Node_fileId_key" ON "Node"("fileId");
