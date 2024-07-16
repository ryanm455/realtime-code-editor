/*
  Warnings:

  - You are about to drop the `_EditingFile` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_EditingFile" DROP CONSTRAINT "_EditingFile_A_fkey";

-- DropForeignKey
ALTER TABLE "_EditingFile" DROP CONSTRAINT "_EditingFile_B_fkey";

-- DropTable
DROP TABLE "_EditingFile";

-- CreateTable
CREATE TABLE "_EditingDocuments" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_EditingDocuments_AB_unique" ON "_EditingDocuments"("A", "B");

-- CreateIndex
CREATE INDEX "_EditingDocuments_B_index" ON "_EditingDocuments"("B");

-- AddForeignKey
ALTER TABLE "_EditingDocuments" ADD CONSTRAINT "_EditingDocuments_A_fkey" FOREIGN KEY ("A") REFERENCES "Document"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EditingDocuments" ADD CONSTRAINT "_EditingDocuments_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
