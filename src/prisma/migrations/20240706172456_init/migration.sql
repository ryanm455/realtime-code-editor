/*
  Warnings:

  - You are about to drop the column `nodeId` on the `Document` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Document" DROP CONSTRAINT "Document_nodeId_fkey_unique";

-- DropIndex
DROP INDEX "Document_nodeId_key";

-- AlterTable
ALTER TABLE "Document" DROP COLUMN "nodeId";

-- AddForeignKey
ALTER TABLE "Node" ADD CONSTRAINT "Node_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "Document"("id") ON DELETE CASCADE ON UPDATE CASCADE;
