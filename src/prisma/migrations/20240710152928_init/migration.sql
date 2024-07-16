/*
  Warnings:

  - You are about to drop the `_ActiveRooms` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_ActiveRooms" DROP CONSTRAINT "_ActiveRooms_A_fkey";

-- DropForeignKey
ALTER TABLE "_ActiveRooms" DROP CONSTRAINT "_ActiveRooms_B_fkey";

-- DropTable
DROP TABLE "_ActiveRooms";

-- CreateTable
CREATE TABLE "_JoinedRooms" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_JoinedRooms_AB_unique" ON "_JoinedRooms"("A", "B");

-- CreateIndex
CREATE INDEX "_JoinedRooms_B_index" ON "_JoinedRooms"("B");

-- AddForeignKey
ALTER TABLE "_JoinedRooms" ADD CONSTRAINT "_JoinedRooms_A_fkey" FOREIGN KEY ("A") REFERENCES "Room"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_JoinedRooms" ADD CONSTRAINT "_JoinedRooms_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
