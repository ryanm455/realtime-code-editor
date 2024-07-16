/*
  Warnings:

  - You are about to drop the `_EditingDocuments` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_EditingDocuments" DROP CONSTRAINT "_EditingDocuments_A_fkey";

-- DropForeignKey
ALTER TABLE "_EditingDocuments" DROP CONSTRAINT "_EditingDocuments_B_fkey";

-- DropTable
DROP TABLE "_EditingDocuments";

-- CreateTable
CREATE TABLE "_EditingFiles" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_EditingFiles_AB_unique" ON "_EditingFiles"("A", "B");

-- CreateIndex
CREATE INDEX "_EditingFiles_B_index" ON "_EditingFiles"("B");

-- AddForeignKey
ALTER TABLE "_EditingFiles" ADD CONSTRAINT "_EditingFiles_A_fkey" FOREIGN KEY ("A") REFERENCES "Document"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EditingFiles" ADD CONSTRAINT "_EditingFiles_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
