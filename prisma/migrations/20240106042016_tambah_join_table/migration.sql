/*
  Warnings:

  - You are about to drop the column `teacherId` on the `Absensi` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Absensi` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Absensi" DROP COLUMN "teacherId",
ADD COLUMN     "userId" INTEGER NOT NULL;
