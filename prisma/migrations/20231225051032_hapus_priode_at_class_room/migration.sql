/*
  Warnings:

  - You are about to drop the column `periodeEnd` on the `ClassRooms` table. All the data in the column will be lost.
  - You are about to drop the column `periodeStart` on the `ClassRooms` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ClassRooms" DROP COLUMN "periodeEnd",
DROP COLUMN "periodeStart";
