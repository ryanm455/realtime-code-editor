/*
  Warnings:

  - You are about to drop the `RoomUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "RoomUser" DROP CONSTRAINT "RoomUser_roomId_fkey";

-- DropForeignKey
ALTER TABLE "RoomUser" DROP CONSTRAINT "RoomUser_userId_fkey";

-- DropTable
DROP TABLE "RoomUser";

-- CreateTable
CREATE TABLE "_ActiveRooms" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ActiveRooms_AB_unique" ON "_ActiveRooms"("A", "B");

-- CreateIndex
CREATE INDEX "_ActiveRooms_B_index" ON "_ActiveRooms"("B");

-- AddForeignKey
ALTER TABLE "_ActiveRooms" ADD CONSTRAINT "_ActiveRooms_A_fkey" FOREIGN KEY ("A") REFERENCES "Room"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ActiveRooms" ADD CONSTRAINT "_ActiveRooms_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
