/*
  Warnings:

  - You are about to drop the column `periodeEnd` on the `StudentsAndUserOnClassRooms` table. All the data in the column will be lost.
  - You are about to drop the column `periodeStart` on the `StudentsAndUserOnClassRooms` table. All the data in the column will be lost.
  - You are about to drop the column `periodeEnd` on the `StudentsOnClassRooms` table. All the data in the column will be lost.
  - You are about to drop the column `periodeStart` on the `StudentsOnClassRooms` table. All the data in the column will be lost.
  - Made the column `levelClass` on table `ClassRooms` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "ClassRooms" ALTER COLUMN "levelClass" SET NOT NULL;

-- AlterTable
ALTER TABLE "StudentsAndUserOnClassRooms" DROP COLUMN "periodeEnd",
DROP COLUMN "periodeStart",
ADD COLUMN     "periodeId" INTEGER;

-- AlterTable
ALTER TABLE "StudentsOnClassRooms" DROP COLUMN "periodeEnd",
DROP COLUMN "periodeStart",
ADD COLUMN     "periodeId" INTEGER;

-- CreateTable
CREATE TABLE "Periode" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "periodeStart" INTEGER NOT NULL,
    "periodeEnd" INTEGER NOT NULL,

    CONSTRAINT "Periode_pkey" PRIMARY KEY ("id")
);
