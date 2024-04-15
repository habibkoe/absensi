/*
  Warnings:

  - A unique constraint covering the columns `[refCode]` on the table `Schools` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Schools" ALTER COLUMN "name" DROP NOT NULL,
ALTER COLUMN "location" DROP NOT NULL,
ALTER COLUMN "studentTotal" DROP NOT NULL,
ALTER COLUMN "teacherTotal" DROP NOT NULL,
ALTER COLUMN "status" DROP NOT NULL,
ALTER COLUMN "email" DROP NOT NULL,
ALTER COLUMN "telp" DROP NOT NULL,
ALTER COLUMN "posCode" DROP NOT NULL,
ALTER COLUMN "province" DROP NOT NULL,
ALTER COLUMN "city" DROP NOT NULL,
ALTER COLUMN "district" DROP NOT NULL,
ALTER COLUMN "village" DROP NOT NULL,
ALTER COLUMN "nspn" DROP NOT NULL,
ALTER COLUMN "refCode" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "dateOfBirth" TEXT,
ADD COLUMN     "gender" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "Schools_refCode_key" ON "Schools"("refCode");
