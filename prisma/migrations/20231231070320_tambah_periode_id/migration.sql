/*
  Warnings:

  - You are about to drop the column `periodeEnd` on the `UsersOnClassRooms` table. All the data in the column will be lost.
  - You are about to drop the column `periodeStart` on the `UsersOnClassRooms` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "UsersOnClassRooms" DROP COLUMN "periodeEnd",
DROP COLUMN "periodeStart",
ADD COLUMN     "periodeId" INTEGER;
