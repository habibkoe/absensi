/*
  Warnings:

  - Added the required column `infoTambahan` to the `Absensi` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Absensi" ADD COLUMN     "infoTambahan" BOOLEAN NOT NULL;
