/*
  Warnings:

  - Added the required column `levelClass` to the `ClassRooms` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ClassRooms" ADD COLUMN     "levelClass" INTEGER NOT NULL;
