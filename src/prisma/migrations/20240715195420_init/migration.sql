/*
  Warnings:

  - You are about to drop the column `editingFileId` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_editingFileId_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "editingFileId";

-- CreateTable
CREATE TABLE "_EditingFile" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_EditingFile_AB_unique" ON "_EditingFile"("A", "B");

-- CreateIndex
CREATE INDEX "_EditingFile_B_index" ON "_EditingFile"("B");

-- AddForeignKey
ALTER TABLE "_EditingFile" ADD CONSTRAINT "_EditingFile_A_fkey" FOREIGN KEY ("A") REFERENCES "Document"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EditingFile" ADD CONSTRAINT "_EditingFile_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
