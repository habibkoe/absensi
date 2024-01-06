/*
  Warnings:

  - Added the required column `jamPelajaran` to the `Absensi` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pertemuan` to the `Absensi` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Absensi" ADD COLUMN     "jamPelajaran" INTEGER NOT NULL,
ADD COLUMN     "pertemuan" INTEGER NOT NULL;
