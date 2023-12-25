/*
  Warnings:

  - Changed the type of `periodeStart` on the `StudentsAndUserOnClassRooms` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `periodeEnd` on the `StudentsAndUserOnClassRooms` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `periodeEnd` to the `StudentsOnClassRooms` table without a default value. This is not possible if the table is not empty.
  - Added the required column `periodeStart` to the `StudentsOnClassRooms` table without a default value. This is not possible if the table is not empty.
  - Added the required column `periodeEnd` to the `UsersOnClassRooms` table without a default value. This is not possible if the table is not empty.
  - Added the required column `periodeStart` to the `UsersOnClassRooms` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "StudentsAndUserOnClassRooms" DROP COLUMN "periodeStart",
ADD COLUMN     "periodeStart" INTEGER NOT NULL,
DROP COLUMN "periodeEnd",
ADD COLUMN     "periodeEnd" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "StudentsOnClassRooms" ADD COLUMN     "periodeEnd" INTEGER NOT NULL,
ADD COLUMN     "periodeStart" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "UsersOnClassRooms" ADD COLUMN     "periodeEnd" INTEGER NOT NULL,
ADD COLUMN     "periodeStart" INTEGER NOT NULL;
